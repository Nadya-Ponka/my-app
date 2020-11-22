import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseItem } from './../shared/models/course';
import { OrderByPipe } from 'src/app/shared/pipes/orderBy/order-by.pipe';
import { SearchByPipe } from 'src/app/shared/pipes/searchBy/search-by.pipe';
import { CoursesService } from 'src/app/courses-list/services/courses-list-service';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  providers: [OrderByPipe, SearchByPipe],
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
	public courses: CourseItem[];
	public searchText: string;
	
  constructor(
		private orderByPipe: OrderByPipe,
		private searchByPipe: SearchByPipe,
		private coursesService: CoursesService,
		private router: Router
	) {}

  public onSearchText(text: string) {
    console.log('Text for search: ', text);
    this.courses = this.searchByPipe.transform(this.coursesService.getList(), text);
  }

  public onDeleteCourse(event: CourseItem) {
		console.log('Course to delete: ', event.id);
    if (confirm('Do you really want to delete this course? Yes/No')) {
      this.courses = this.coursesService.removeCourse(event);
    }
  }

  public ngOnInit(): void {
    this.courses = this.orderByPipe.transform(this.coursesService.getList(), 'creationDate');
	}
	
	public onCreateCourse() {
    const link = ['/courses/new'];
    this.router.navigate(link);
	}

	public onEditCourse(item: CourseItem) {
    const link = [`/courses/${item.id}`];
    this.router.navigate(link);
  }
}
