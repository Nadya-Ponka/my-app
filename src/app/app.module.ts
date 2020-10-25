import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { FooterComponent } from './app-footer/app-footer.component';
import { LogoComponent } from './app-header/logo/logo.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseComponent } from './courses-list/course/course.component';
import { AppRoutingModule } from './app-routing.module';

import { RouterLinkStubDirective } from 'src/app/testing-helpers/router-stubs';
import { RouterOutletStubComponent } from 'src/app/testing-helpers/router-stubs';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    FooterComponent,
    LogoComponent,
		BreadcrumbsComponent,
		CoursesListComponent,
		CourseComponent,
		RouterLinkStubDirective,
    RouterOutletStubComponent
  ],
  imports: [ BrowserModule, FormsModule, AppRoutingModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
	constructor(readonly router: Router) {
    const replacer = (key: string, value: any): string =>
      typeof value === 'function' ? value.name : value;

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}