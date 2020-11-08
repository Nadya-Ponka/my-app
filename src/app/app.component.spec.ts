import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
// import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

let fixture: ComponentFixture<AppComponent>;

@Component({ selector: 'app-header', template: '' })
class AppHeaderComponent {}

@Component({ selector: 'breadcrumbs', template: '' })
class BreadcrumbsComponent {}

@Component({ selector: 'courses-list', template: '' })
class CoursesListComponent {}

@Component({ selector: 'app-footer', template: '' })
class FooterComponent {}

let app: AppComponent;

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
				AppComponent,
				// AppHeaderComponent,
				// BreadcrumbsComponent,
				// CoursesListComponent,
				// FooterComponent
			],
			// imports: [ RouterTestingModule ]
			schemas: [NO_ERRORS_SCHEMA]
		});
		fixture = TestBed.createComponent(AppComponent);
    // Запускаем первоначальную инициализацию и получаем экземпляры директив навигации
		fixture.detectChanges();
		app = fixture.debugElement.componentInstance;
  });

	it('should create the app', () => {
    expect(app).toBeTruthy();
	});
});
