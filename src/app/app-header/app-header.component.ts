import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/admin/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Action } from '@ngrx/store';
import { Store, select, } from '@ngrx/store';

import { AppState, selectUsersData, selectUsersError  } from 'src/app/@ngrx';
import * as UsersActions from 'src/app/@ngrx/admin/users.actions';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
	@Output() changeLang = new EventEmitter < string > ();

	public userInfo = new Subject();
	public userName = '';
	public accessAllowed$;
	public selectedLang;

	public languages = [
		{value: 'en', name: 'English'},
		{value: 'de', name: 'German'}
	]
  constructor(
    public authService: AuthService,
		private router: Router,
		private route: ActivatedRoute,
		private store: Store < AppState >,
	) {
		this.userInfo.pipe().subscribe({
			next: (user:string) => {
				this.userName = user;
			}
		});
	}
	

	public ngOnInit(): void {
		this.accessAllowed$ = this.store.pipe(select(selectUsersData));
		this.accessAllowed$.subscribe( {next: (isShown) => this.userName = isShown} );
	}
	
	public onLogin() {
		this.router.navigate(['/admin']);
	}
	
  public onLogout() {
		this.store.dispatch(UsersActions.logoutUser());
		this.router.navigate(['/admin']);
	}

	public ngDoCheck(): void {
		this.userInfo.next(JSON.parse(localStorage.getItem('userinfo')) ? JSON.parse(localStorage.getItem('userinfo')).name.firstName : '');
	}
	
	public onLang(): void {
    this.changeLang.emit(this.selectedLang);
  }

}
