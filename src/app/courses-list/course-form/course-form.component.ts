import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseItem } from 'src/app/shared/models/course';
import { CoursesService } from 'src/app/courses-list/services/courses-list-service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  public item: CourseItem;

  constructor(
		private coursesService: CoursesService,
		private router: Router
	) { }

	public onSaveItem() {
		this.coursesService.createOrUpdateCourse(this.item);
		this.onGoBack();
	}

	public onGoBack() {
    this.router.navigate(['/courses']);
  }

  public ngOnInit() {
    let url = this.router.routerState.snapshot.url;
    const navigatedForEdit = /\/courses\/new/.test(url);
    let id: number;
    if (!navigatedForEdit) {
      url = url.slice(9);
      id = +url;
    }

    if (id != undefined) {
      this.item = this.coursesService.getCourseByID(id);
    } else {
      this.item = new CourseItem(this.coursesService.getList().length, '', false, new Date(), 0, '');
    }
  }
}