import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { LogoComponent } from './app-header/logo/logo.component';
import { CourseComponent } from './courses-list/course/course.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    CoursesListComponent,
    AppFooterComponent,
    LogoComponent,
    CourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
