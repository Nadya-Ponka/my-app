import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
		public spinnerService: SpinnerService,
		public translateService: TranslateService
  ) {
		translateService.setDefaultLang('en');
	}

  ngOnInit() {
		this.spinnerService.isVisible().subscribe((info: boolean) => this.showSpinner = info);
		this.authService.getUserInfo();
	}

	public changeLang(lang) {
		this.translateService.setDefaultLang(lang);
	}
}