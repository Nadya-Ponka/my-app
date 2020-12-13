import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CourseItem } from 'src/app/shared/models/course';
import { CoursesAPI } from 'src/app/courses-list/services/courses.config';
import { SpinnerService } from 'src/app/widgets';

@Injectable({
  providedIn: 'root'
})

export class CoursesPromiseService {
	public wait(ms: number) {
		return function(v) {
			return new Promise(resolve => setTimeout(() => resolve(v), ms));
		};
	}

  constructor(private http: HttpClient,
    private spinnerService: SpinnerService,
    @Inject(CoursesAPI) private coursesBaseUrl: string){}

		getFullList(): Promise < CourseItem[] > {
		const url = this.coursesBaseUrl + `courses`;
    this.spinnerService.show();

    return this.http
      .get(url)
			.toPromise()
			.then(this.wait(2000))
      .then(response => {
				this.spinnerService.hide();
				return response as CourseItem[];
			})
      .catch(this.handleError);
  }

	getList(startIndex: number, amount: number, searchInCourses: string) {
    this.spinnerService.show();

    return this.http.get < [] > (this.coursesBaseUrl + `courses?start=${startIndex}&count=${amount}&textFragment=${searchInCourses}`)
		.toPromise()
		.then(this.wait(2000))
		.then(response => {
			this.spinnerService.hide();
			return response as CourseItem[];
		})
		.catch(this.handleError);
}

  getSearchedList(searchInCourses: string) {
    this.spinnerService.show();

    return this.http.get < [] > (this.coursesBaseUrl + `courses?textFragment=${searchInCourses}`)
		.toPromise()
		.then(this.wait(2000))
		.then(response => {
			this.spinnerService.hide();
			return response as CourseItem[];
		})
		.catch(this.handleError);
}

  getCourse(id: number): Promise < CourseItem > {
    const url = `${this.coursesBaseUrl}courses/${id}`;
    this.spinnerService.show();

    return this.http
      .get(url)
			.toPromise()
			.then(this.wait(2000))
      .then(response => {
				this.spinnerService.hide();
        return response as CourseItem;
      })
      .catch(this.handleError);
  }

  updateCourse(course: CourseItem): Promise < CourseItem > {
		const url = `${this.coursesBaseUrl}courses/${course.id}`;
		const newCourse = {
			id: Math.round(Math.random()*10000),
			name: course.title,
			isTopRated: course.topRated,
			date: course.creationDate,
			length:course.duration,
			description: course.description
		};

    const body = JSON.stringify(newCourse);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http
      .put(url, body, options)
			.toPromise()
			.then(this.wait(2000))
      .then(response => {
        console.log('updatedCourse: ', response);
        return response as CourseItem;
      })
      .catch(this.handleError);
  }

  createCourse(course: CourseItem): Promise < CourseItem > {
		const newCourse = {
			id: Math.round(Math.random()*10000),
			name: course.title,
			isTopRated: course.topRated,
			date: course.creationDate,
			length:course.duration,
			description: course.description
		};

    const url = this.coursesBaseUrl + `courses`;
    const body = JSON.stringify(newCourse);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http
      .post(url, body, options)
			.toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

	removeCourse(course: CourseItem): Promise < CourseItem > {
    this.spinnerService.show();
    const url = this.coursesBaseUrl + `courses/${course.id}`;
    return this.http.delete(url)
		.toPromise()
		.then(this.wait(2000))
		.then(() => {
			this.spinnerService.hide();
		})
    .catch(this.handleError);
  }

  private handleError(error: any): Promise < any > {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
