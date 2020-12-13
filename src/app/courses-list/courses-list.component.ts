import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, interval } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, selectCoursesData, selectCoursesError  } from 'src/app/@ngrx';

import { CourseItem, ICourse } from 'src/app/shared/models/course';
import { CoursesPromiseService } from 'src/app/courses-list/services/courses-promise.service';
import { OrderByPipe } from 'src/app/shared/pipes/orderBy/order-by.pipe';
import { SearchByPipe } from 'src/app/shared/pipes/searchBy/search-by.pipe';
import { CoursesObservableService } from 'src/app/courses-list/services/courses-observable.service';	
import { SpinnerService } from 'src/app/widgets';
import * as CoursesActions from 'src/app/@ngrx/courses-list/courses-list.actions';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  providers: [OrderByPipe, SearchByPipe],
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
	public courses: CourseItem[];
	public coursesError$: Observable < Error | string > ;
	public searchText: string = '';
	public inputSearchText;
  public courses$: Observable < ReadonlyArray < CourseItem >>;

  constructor(
		private orderByPipe: OrderByPipe,
		private searchByPipe: SearchByPipe,
		private coursesObservableService: CoursesObservableService,
		public spinnerService: SpinnerService,
		private router: Router,
		private coursesPromiseService: CoursesPromiseService,
		private store: Store < AppState >
	) {}

  public onSearchText(event: any) {
		this.inputSearchText.next(event.target.value);
	}

  public onDeleteCourse(course: ICourse) {
    if (confirm('Do you really want to delete this course? Yes/No')) {
			const courseToDelete: ICourse = { ...course };
			this.store.dispatch(CoursesActions.deleteCourse({ course: courseToDelete }));
    }
  }

  public ngOnInit(): void {
    // this.coursesObservableService.getList(0, 5, '').subscribe(response => {
		// 	this.courses = this.orderByPipe.transform(response, 'creationDate');
		// });

		// this.inputSearchText = new Subject();
		// this.inputSearchText.pipe(
		// 	debounce(() => interval(5000))
		//  ).subscribe({
		// 	next: (text: string) => {
		// 		this.coursesObservableService.getFullList()
		// 		.subscribe((courses: Array<CourseItem>) => {
		// 			this.searchByPipe.transform(text).subscribe(data => {
		// 				this.courses = data;
		// 				this.spinnerService.hide();
		// 			});
		// 		});
		// 	}
		// });

		this.courses$ = this.store.pipe(select(selectCoursesData));
		console.log('this.courses$: ', this.courses$);
    this.coursesError$ = this.store.pipe(select(selectCoursesError));
		this.store.dispatch(CoursesActions.getCourses());
		
		this.inputSearchText = new Subject < string > ();
    this.inputSearchText.pipe(
      filter((val: string) => val.length >= 3),
      debounceTime(1000)
    ).subscribe({
      next: (text: string) => {
				this.store.dispatch(CoursesActions.getSearchedCourses({
          text: text
        }));
      }
    });
	}
	
	public onCreateCourse() {
    const link = ['/courses/new'];
    this.router.navigate(link);
	}

	public onEditCourse(item: CourseItem) {
    const link = [`/courses/${item.id}`];
    this.router.navigate(link);
	}
	public onShowMore(): void {
    this.coursesObservableService.getList(this.courses.length, 5, '').subscribe(data => {
      this.courses.push(...data);
    });
  }
}
