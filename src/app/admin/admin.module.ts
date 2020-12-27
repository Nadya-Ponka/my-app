import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { httpInterceptorProviders } from 'src/app/admin/interceptors/index';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);;
}

@NgModule({
  declarations: [AdminComponent],
  imports: [
		CommonModule, 
		FormsModule, 
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
  ],
  providers: [
    httpInterceptorProviders
  ]
})
export class AdminModule {}
