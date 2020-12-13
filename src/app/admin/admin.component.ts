import { Component, OnInit } from '@angular/core';

// @Ngrx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/@ngrx';

import { Observable } from 'rxjs';

import { UserItem } from 'src/app/shared/models/user';
import * as UsersActions from 'src/app/@ngrx/admin/users.actions';
import { SpinnerService } from 'src/app/widgets';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public userinfo = {
		login: '',
    password: ''
	};
	public user$: Observable < UserItem > ;

  constructor(
		public spinnerService: SpinnerService,
		private store: Store < AppState >,
  ) {}

  public onLogin() {
    const user = {
      login: this.userinfo.login,
      password: this.userinfo.password
    }
    this.store.dispatch(UsersActions.checkUser({ user: user	}));
		this.userinfo.login = '';
		this.userinfo.password = '';
  }

  public ngOnInit() {
		this.spinnerService.hide();
	}
}