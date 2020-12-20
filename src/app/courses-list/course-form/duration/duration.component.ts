import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, Validator, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormGroup } from "@angular/forms";
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { FormBuilder, FormArray, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'form-duration',
  templateUrl: './duration.component.html',
	styleUrls: ['./duration.component.css'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	viewProviders: [ { provide: ControlContainer, useExisting: FormGroupDirective }],
	providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DurationComponent,
      multi: true
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationComponent),
      multi: true
		}
	]
})
export class DurationComponent implements Validator, ControlValueAccessor {
	@Input() message: string;

	private pattern =  /^(0|[1-9][0-9]*)$/;

  constructor() { }

	public validate(control: FormControl): { [key: string]: any } | null {
		console.log('DATA: ', control);
    if (!control.value) {
      if (control.dirty) {
        return control.errors;
      }
      else {
        return null;
      }
    }
    return this.pattern.test(control.value) ? null : { wrongFormat: true };
  }

	private onChange = data => {
	}
	private onTouched = data => {
	}

	public onChangeDuration(data) {
		console.log('Change Duration Message:', this.message, 'data.target.value: ', data.target.value);
		// this.validate(new FormControl(data.target.value, Validators.required));
		this.onChange(new FormControl(data.target.value, Validators.required));
	}
	
  public registerOnChange = fn => {
    this.onChange = fn;
  }

	public writeValue = (value) => {
    console.log("writeValue duration: ", value);
  }

  public registerOnTouched = () => {
    console.log("registerOnTouched");
  }

}
