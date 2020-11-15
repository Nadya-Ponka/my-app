import { Component, OnInit, Input } from '@angular/core';

import { CourseItem } from 'src/app/shared/models/course';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css']
})
export class DurationComponent implements OnInit {
	@Input() item: CourseItem;

  constructor() { }

  ngOnInit() {
  }
}
