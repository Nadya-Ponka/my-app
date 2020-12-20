import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncEmailValidatorDirective } from 'src/app/courses-list/course-form/validators/async-email-validator.directive';

@NgModule({
  declarations: [ AsyncEmailValidatorDirective ],
  imports: [
    CommonModule
  ]
})
export class ValidatorsModule { }
