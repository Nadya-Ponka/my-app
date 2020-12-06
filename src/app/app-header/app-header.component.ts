import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/admin/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
	public userInfo;
	public isLogged: boolean;

  constructor(
    public authService: AuthService,
		private router: Router,
    private route: ActivatedRoute
	) {}

	public ngOnInit(): void {
		this.userInfo = new Subject();
		this.userInfo.pipe(
		 ).subscribe({
			next: () => {
				localStorage.getItem('userinfo')
			}
		});
	}
	
	public onLogin() {
		this.router.navigate(['/admin']);
	}
	
  public onLogout() {
    this.authService.logout();
		this.router.navigate(['/courses']);
	}

	public ngDoCheck(): void {
		this.userInfo = localStorage.getItem('userinfo');
  }
}
