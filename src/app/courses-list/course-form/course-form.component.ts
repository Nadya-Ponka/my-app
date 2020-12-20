import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, selectSelectedCourse, CoursesState, selectCoursesState } from 'src/app/@ngrx';

import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CourseItem } from 'src/app/shared/models/course';
import { CoursesPromiseService } from 'src/app/courses-list/services/courses-promise.service';
import * as CoursesActions from 'src/app/@ngrx/courses-list/courses-list.actions';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit, OnDestroy {
/* 	public placeholder = {
    email: 'Email (required)',
    phone: 'Phone',
    confirmEmail: 'Confirm Email (required)'
  };
 */
  public item: CourseItem;
  private sub: Subscription;
  coursesState$: Observable < CoursesState > ;

	  // form model
		courseForm: FormGroup;
		validationMessage: string;
		titleValidationMessage: string;
		descriptionValidationMessage: string;
		durationValidationMessage: string = '';

		private validationMessagesMap = {
			courseTitle: {
				required: 'This field is required.',
				maxlength: 'Maximum limit exceeded. Title must be shorter than 50 characters.'
			},
			courseDescription: {
				required: 'This field is required.',
				maxlength: 'Maximum limit exceeded. Title must be shorter than 500 characters.'
			},
			creationDate: {
				required: 'This field is required.'
			},
			courseDuration: {
				required: 'This field is required.',
				pattern: 'Only numbers allowed.'
			}
	 };
	
  constructor(
    private router: Router,
    private route: ActivatedRoute,
		private coursesPromiseService: CoursesPromiseService,
		private store: Store < AppState >,
		private fb: FormBuilder
  ) {}

	private setValidationMessage(c: AbstractControl, controlName: string) {
    this.validationMessage = '';
		this.titleValidationMessage = '';
		this.descriptionValidationMessage = '';
		this.durationValidationMessage = '';

    if (c.errors) { //(c.touched || c.dirty || controlName === 'courseDuration') && 
			console.log('c.errors:::::::::::::', c.errors);
			switch(controlName) {
				case 'courseTitle':
						this.titleValidationMessage = Object.keys(c.errors)
						.map(key => this.validationMessagesMap[controlName][key])
						.join(' ');
						break;
				case 'courseDescription':
						this.descriptionValidationMessage = Object.keys(c.errors)
						.map(key => this.validationMessagesMap[controlName][key])
						.join(' ');
						break;
				case 'courseDuration':
						this.durationValidationMessage = Object.keys(c.errors)
						.map(key => this.validationMessagesMap[controlName][key])
						.join(' ');
						break;
				default:
					this.validationMessage = Object.keys(c.errors)
						.map(key => this.validationMessagesMap[controlName][key])
						.join(' ');
			}
    }
  }

	onBlur(group) {
		const fieldControl = this.courseForm.get(group);
		console.log('FIELD CONTROL: ', fieldControl);
    this.setValidationMessage(fieldControl, group);
  }

	private buildForm() {
    this.courseForm = this.fb.group({
			courseTitle: this.fb.control(this.item.title, {
        validators: [Validators.required, Validators.maxLength(50)]/* ,
        updateOn: 'blur' */
			}),
			courseDescription: this.fb.control(this.item.description, {
        validators: [Validators.required, Validators.maxLength(500)]/* ,
        updateOn: 'blur' */
			}),
			creationDate: this.fb.control(this.item.creationDate, {
        validators: [Validators.required]/* ,
        updateOn: 'blur' */
      }),
			courseDuration: this.fb.control(this.item.duration, {
        validators: [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]/* ,
        updateOn: 'blur' */
      })
		});
  }

  public onSaveItem(form: FormGroup) {
    // if (this.item.id === undefined) {
    //   this.item.id = Math.random() * 1000;
    //   this.sub = this.coursesObservableService.createCourse(this.item)
    //     .subscribe((elem: any) => {
    //       this.onGoBack();
    //     }),

    //     error => console.log(error);
    // } else {
    //   this.sub = this.coursesObservableService.updateCourse(this.item)
    //     .subscribe((elem: CourseItem) => {
    //       this.onGoBack();
    //     }),
    //     error => console.log(error);
		// }
		const course = { ...this.item } as CourseItem;
		course.title = this.courseForm.value.courseTitle;
		course.description = this.courseForm.value.courseDescription;
		course.duration = this.courseForm.value.courseDuration;
		course.creationDate = this.courseForm.value.creationDate;
		
    if (course.id) {
      this.store.dispatch(CoursesActions.updateCourse({
        course
      }));
    } else {
      this.store.dispatch(CoursesActions.createCourse({
        course: course
      }));
    }
  }

  public onGoBack() {
    this.router.navigate(['/courses']);
  }

	// public onChangeDuration(event: number): void {
	// 	this.item.duration = event;
	// 	this.buildForm();
	// }

	// public onChangeDate(event: Date): void {
	// 	this.item.creationDate = event;
	// 	this.buildForm();
	// }

  public ngOnInit() {
    // this.item = new CourseItem(undefined, '', false, new Date(), 0, '', []);

    // let url = this.router.routerState.snapshot.url;
    // const navigatedForEdit = /\/courses\/add/.test(url);
    // let id: number;
    // if (!navigatedForEdit) {
    //   url = url.slice(9);
    //   id = +url;
    // }

    // // it is not necessary to save subscription to route.paramMap
    // // when router destroys this component, it handles subscriptions automatically
    // if (id !== undefined) {
    //   this.route.paramMap
    //     .pipe(
    //       switchMap((params: ParamMap) => {
    //         return this.coursesObservableService.getCourseByID(+params.get('id'));
    //       }))
    //     .subscribe(
    //       course => this.item = course,
    //       err => console.log(err)
    //     );
		// }
		
		this.coursesState$ = this.store.pipe(select(selectCoursesState));
    this.sub = this.coursesState$.subscribe(coursesState => {
      if (coursesState.selectedCourse) {
        this.item = { ...coursesState.selectedCourse } as CourseItem;
      } else {
        this.item = new CourseItem(undefined, '', false, new Date(), 0, '');
			}
			this.buildForm();
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('courseID');
      if (id) {
        this.store.dispatch(CoursesActions.getCourse({
          courseID: +id
        }));
			} else this.item = new CourseItem(undefined, '', false, new Date(), 0, '');
			this.buildForm();

    });
  }

  public ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
