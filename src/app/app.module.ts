import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminModule } from 'src/app/admin/admin.module';
import { AppComponent } from 'src/app/app.component';
import { AppHeaderComponent } from 'src/app/app-header/app-header.component';
import { FooterComponent } from 'src/app/app-footer/app-footer.component';
import { LogoComponent } from 'src/app/app-header/logo/logo.component';
import { BreadcrumbsComponent } from 'src/app/breadcrumbs/breadcrumbs.component';
import { CoursesListComponent } from 'src/app/courses-list/courses-list.component';
import { CourseComponent } from 'src/app/courses-list/course/course.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HoursPipe } from 'src/app/shared/pipes/hours-pipe/hours.pipe';
import { BorderDirective } from 'src/app/shared/directives/border.directive';
import { OrderByPipe } from 'src/app/shared/pipes/orderBy/order-by.pipe';
import { SearchByPipe } from 'src/app/shared/pipes/searchBy/search-by.pipe';
import { CourseFormComponent } from 'src/app/courses-list/course-form/course-form.component';

import { CreationDateComponent } from 'src/app/courses-list/course-form/creation-date/creation-date.component';
import { DurationComponent } from 'src/app/courses-list/course-form/duration/duration.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
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
		HoursPipe,
		BorderDirective,
		OrderByPipe,
		SearchByPipe,
		CourseFormComponent,
		CreationDateComponent,
    DurationComponent,
    PageNotFoundComponent,
		RouterLinkStubDirective,
    RouterOutletStubComponent
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