import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminModule } from 'src/app/admin/admin.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { FooterComponent } from './app-footer/app-footer.component';
import { LogoComponent } from './app-header/logo/logo.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseComponent } from './courses-list/course/course.component';
import { AppRoutingModule } from './app-routing.module';
import { HoursPipe } from 'src/app/shared/pipes/hours-pipe/hours.pipe';
import { BorderDirective } from 'src/app/shared/directives/border.directive';
import { OrderByPipe } from 'src/app/shared/pipes/orderBy/order-by.pipe';
import { SearchByPipe } from 'src/app/shared/pipes/searchBy/search-by.pipe';
import { CourseFormComponent } from './courses-list/course-form/course-form.component';

import { RouterLinkStubDirective } from 'src/app/testing-helpers/router-stubs';
import { RouterOutletStubComponent } from 'src/app/testing-helpers/router-stubs';
import { CreationDateComponent } from './courses-list/course-form/creation-date/creation-date.component';
import { DurationComponent } from './courses-list/course-form/duration/duration.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    FooterComponent,
    LogoComponent,
		BreadcrumbsComponent,
		CoursesListComponent,
		CourseComponent,
		HoursPipe,
		BorderDirective,
		OrderByPipe,
		SearchByPipe,
		CourseFormComponent,
		RouterLinkStubDirective,
    RouterOutletStubComponent,
    CreationDateComponent,
    DurationComponent
  ],
  imports: [ AdminModule, BrowserModule, FormsModule, AppRoutingModule ],
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