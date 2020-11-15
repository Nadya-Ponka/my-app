import { Component, OnInit, Input } from '@angular/core';

import { CourseItem } from 'src/app/shared/models/course';

@Component({
  selector: 'app-creation-date',
  templateUrl: './creation-date.component.html',
  styleUrls: ['./creation-date.component.css']
})
export class CreationDateComponent implements OnInit {
	@Input() message: string;
	@Input() item: CourseItem;

  constructor() { }

  ngOnInit() {
  }

}
