import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CourseItem } from './../shared/models/course';
import { OrderByPipe } from 'src/app/shared/pipes/orderBy/order-by.pipe';
import { SearchByPipe } from 'src/app/shared/pipes/searchBy/search-by.pipe';
import { CoursesService } from 'src/app/courses-list/services/courses-list-service';
import { CoursesObservableService } from 'src/app/courses-list/services/courses-observable.service';	

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  providers: [OrderByPipe, SearchByPipe],
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
	public courses: CourseItem[];
	public searchText: string;
	public coursesError$: Observable < Error | string > ;
	
  constructor(
		private orderByPipe: OrderByPipe,
		private searchByPipe: SearchByPipe,
		private coursesObservableService: CoursesObservableService,
		private router: Router
	) {}

  public onSearchText(event: any) {
		console.log('EVENT: ', this.searchText);	
		this.searchByPipe.transform(event.target.value).subscribe(data => {
			this.courses = data;
		});
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
