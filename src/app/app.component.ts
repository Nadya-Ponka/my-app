import { Component, ViewEncapsulation } from '@angular/core';

import { AuthService } from 'src/app/admin/services/auth.service';
import { SpinnerService } from 'src/app/widgets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public title = 'courses-application';
  public showSpinner: boolean = true;

  constructor(
		public authService: AuthService,
		public spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.spinnerService.isVisible().subscribe((info: boolean) => this.showSpinner = info);
	}
}