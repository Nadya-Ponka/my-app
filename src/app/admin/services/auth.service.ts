import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UserItem } from 'src/app/shared/models/user';
import { CoursesAPI } from 'src/app/courses-list/services/courses.config';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public isLoggedIn = false;
  public userID = 0;

  constructor(
    private http: HttpClient,
    @Inject(CoursesAPI) private coursesBaseUrl: string
	) {}
	// store the URL so we can redirect after logging in
  public redirectUrl: string;

  public getAllUsers() {
    const url = this.coursesBaseUrl + 'users';
    return this.http.get(url);
  }

  public getUser() {
    const url = this.coursesBaseUrl + `users`;
    return this.http.get < [] > (url);
  }

  public login(userinfo) {
		return this.getAllUsers().
		pipe(
			map((users: Array<any>) => {
				const currentUser = users.find(usr => usr.login === userinfo.login && usr.password === userinfo.password);
				if (currentUser) {
					const info = {
						id: currentUser.id,
						token: currentUser.fakeToken,
						name: {
							firstName: currentUser.name.first,
							lastName: currentUser.name.last
						},
						login: currentUser.login,
						password: currentUser.password
					}

					console.log('USER: ', currentUser);
					console.log('INFO: ', info);

    	    localStorage.setItem('userinfo', JSON.stringify(info.name.firstName));
					localStorage.setItem('fakeToken', JSON.stringify(info.token));
					this.isLoggedIn = true;
					return info;
				}})
		);
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('userinfo');
    console.log('Log Out action');
  }

  isAuthenticated(): any {
		return this.isLoggedIn;
  }

  getUserInfo(userinfo: UserItem) {
    const url = this.coursesBaseUrl + `auth/login`;
    const body = JSON.stringify(userinfo);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, body, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}