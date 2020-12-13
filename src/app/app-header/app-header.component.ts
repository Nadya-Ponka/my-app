import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/admin/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Action } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
	public userInfo = new Subject();
	public userName = '';

  constructor(
    public authService: AuthService,
		private router: Router,
    private route: ActivatedRoute
	) {
		this.userInfo.pipe().subscribe({
			next: (user:string) => {
				this.userName = user;
			}
		});
	}
	

	public ngOnInit(): void {
	}
	
	public onLogin() {
		this.router.navigate(['/admin']);
	}
	
  public onLogout() {
    this.authService.logout();
		this.router.navigate(['/admin']);
	}

	public ngDoCheck(): void {
		this.userInfo.next(JSON.parse(localStorage.getItem('userinfo')) ? JSON.parse(localStorage.getItem('userinfo')).name.firstName : '');
  }
}
