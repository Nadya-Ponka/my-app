import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { CourseItem } from './../shared/models/course';
import { OrderByPipe } from 'src/app/shared/pipes/orderBy/order-by.pipe';
import { SearchByPipe } from 'src/app/shared/pipes/searchBy/search-by.pipe';
import { CoursesObservableService } from 'src/app/courses-list/services/courses-observable.service';	
import { SpinnerService } from 'src/app/widgets';

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

  constructor(
		private orderByPipe: OrderByPipe,
		private searchByPipe: SearchByPipe,
		private coursesObservableService: CoursesObservableService,
		public spinnerService: SpinnerService,
		private router: Router
	) {}

  public onSearchText(event: any) {
		this.inputSearchText.next(event.target.value);
	}

  public onDeleteCourse(event: CourseItem) {
    if (confirm('Do you really want to delete this course? Yes/No')) {
      this.coursesObservableService.removeCourse(event, this.courses.length).subscribe(data => {
          this.courses = this.orderByPipe.transform(data, 'creationDate');
      });
    }
  }

  public ngOnInit(): void {
    this.coursesObservableService.getList(0, 5, '').subscribe(response => {
			this.courses = this.orderByPipe.transform(response, 'creationDate');
		});

		this.inputSearchText = new Subject();
		this.inputSearchText.pipe(
			debounce(() => interval(5000))
		 ).subscribe({
			next: (text: string) => {
				this.coursesObservableService.getFullList()
				.subscribe((courses: Array<CourseItem>) => {
					this.searchByPipe.transform(text).subscribe(data => {
						this.courses = data;
						this.spinnerService.hide();
					});
				});
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
