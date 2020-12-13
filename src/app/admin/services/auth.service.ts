import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UserItem } from 'src/app/shared/models/user';
import { CoursesAPI } from 'src/app/courses-list/services/courses.config';
import { SpinnerService } from 'src/app/widgets';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public isLoggedIn = false;
  public userID = 0;
  public userInfo = new Subject();
	private info: any = {
		name: {
			firstName: '',
			lastName: ''
		}
	};
	public wait(ms: number) {
		return function(v) {
			return new Promise(resolve => setTimeout(() => resolve(v), ms));
		};
	}

  constructor(
		private http: HttpClient,
		private spinnerService: SpinnerService,
		private router: Router,
    @Inject(CoursesAPI) private coursesBaseUrl: string
	) {
		this.userInfo.pipe().subscribe({
      next: (text: string) => text
		});
	}
	// store the URL so we can redirect after logging in
  public redirectUrl: string;

  public getAllUsers() {
    const url = this.coursesBaseUrl + 'users';
    return this.http.get(url);
  }

  public login(userinfo) {
		this.spinnerService.show();
		
    return this.getAllUsers()
		.toPromise()
		.then(this.wait(2000))
		.then((users: Array < any > ) => {
        const currentUser = users.find(usr => usr.login === userinfo.login && usr.password === userinfo.password);
        if (currentUser) {
          this.info = {
            id: currentUser.id,
            token: currentUser.fakeToken,
            name: {
              firstName: currentUser.name.first,
              lastName: currentUser.name.last
            },
            login: currentUser.login,
            password: currentUser.password
          };

          localStorage.setItem('userinfo', JSON.stringify(this.info));
          localStorage.setItem('fakeToken', JSON.stringify(this.info.token));
          this.userInfo.next(this.info);
          this.isLoggedIn = true;
					this.router.navigate(['/']);
					return this.info;
			    } else {
						alert('Credentials are wrong');
						this.spinnerService.hide();
						return null;
        }
      })
	}

  logout(): void {
    this.isLoggedIn = false;
		localStorage.removeItem('userinfo');
		localStorage.removeItem('fakeToken');
    console.log('Log Out action');
  }

  isAuthenticated(): any {
		return this.isLoggedIn;
  }

	public getUser(token: string) {
    const url = this.coursesBaseUrl + `auth/userinfo`;
    const body = JSON.stringify({token: token});
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

  public getUserInfo() {
		if (localStorage.getItem('userinfo') && JSON.parse(localStorage.getItem('userinfo')).token)
		return this.getUser(JSON.parse(localStorage.getItem('userinfo')).token)
		.toPromise()
		.then((data: any) => {
			this.info = {
				id: data.id,
				token: data.fakeToken,
				name: {
					firstName: data.name.first,
					lastName: data.name.last
				},
				login: data.login,
				password: data.password
			};

			localStorage.setItem('userinfo', JSON.stringify(this.info));
			localStorage.setItem('fakeToken', JSON.stringify(this.info.token));
			this.userInfo.next(this.info);
			this.isLoggedIn = true;
			this.router.navigate(['/']);
		});
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