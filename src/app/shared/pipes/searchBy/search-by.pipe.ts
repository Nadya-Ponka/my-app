import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

import { CourseItem } from 'src/app/shared/models/course';
import { CoursesObservableService } from 'src/app/courses-list/services/courses-observable.service';	

@Pipe({
  name: 'searchBy'
})
export class SearchByPipe implements PipeTransform {
	constructor(
		private coursesObservableService: CoursesObservableService,
	){}

  transform(text: string): Observable<CourseItem[]> {
    text = text.toLowerCase();
    return this.coursesObservableService.getList(0,undefined,text);
  }
}
