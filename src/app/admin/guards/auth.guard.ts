import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, NavigationExtras } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Store, select, } from '@ngrx/store';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { AppState, selectUsersData, selectUsersError  } from 'src/app/@ngrx';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	public accessAllowed$: Observable < any >;
	public name$: Observable < string >;

  constructor(
    private authService: AuthService,
		private store: Store < AppState >,
		private router: Router
  ) {
		this.accessAllowed$ = this.store.pipe(select(selectUsersData));
	}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable < boolean | UrlTree > | Promise < boolean | UrlTree > | boolean | UrlTree {
    console.log('CanActivate Guard is called');
		this.accessAllowed$.subscribe( { next: info => this.name$ = info.name.firstName || null});
    const {
      url
    } = state;
    if (this.checkLogin(url)) {
      return of(true);
    } else {
      this.router.navigate(['/admin']);
      return of(false);
    }
  }

  private checkLogin(url: string): boolean | UrlTree {
    if (this.name$) {
      console.log('Guard is passed', this.name$);
      return true;
		}
    // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page, return UrlTree
    // return this.router.parseUrl('/login');
    this.router.navigate(['/admin']);
    return false;
  }
}