import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { LogoComponent } from './app-header/logo/logo.component';
import { CourseComponent } from './courses-list/course/course.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    CoursesListComponent,
    AppFooterComponent,
    LogoComponent,
    CourseComponent,
    BreadcrumbsComponent
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
