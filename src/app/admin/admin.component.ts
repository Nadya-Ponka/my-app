import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/admin/services/auth.service';
import { Router } from '@angular/router';
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
  constructor(
    private authService: AuthService,
		public spinnerService: SpinnerService,
    private router: Router
  ) {}

  public onLogin() {
    this.authService.login(this.userinfo)
    .subscribe(user => {
			if (user) this.router.navigate(['/']);
			else {
				alert('Credentials are wrong');
				this.userinfo.login = '';
				this.userinfo.password = '';
			}
		});
  }

  public ngOnInit() {
		this.spinnerService.hide();
	}
}