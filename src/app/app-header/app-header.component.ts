import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/admin/services/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
		private router: Router,
    private route: ActivatedRoute
	) {}

	public ngOnInit(): void {}
	
	public onLogin() {
    this.router.navigate(['/admin']);
  }

  public onLogout() {
    this.authService.logout();
		this.router.navigate(['/courses']);
	}
}
