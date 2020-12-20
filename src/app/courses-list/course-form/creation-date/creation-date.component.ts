import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, Validator, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormGroup } from "@angular/forms";
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import * as moment from 'node_modules/moment';

@Component({
  selector: 'form-creation-date',
  templateUrl: './creation-date.component.html',
  styleUrls: ['./creation-date.component.css'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	viewProviders: [ { provide: ControlContainer, useExisting: FormGroupDirective }],
	providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CreationDateComponent,
      multi: true
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreationDateComponent),
      multi: true
		}
	]
})
export class CreationDateComponent implements Validator, ControlValueAccessor {
	@Input() message: string;

  constructor() { }

	public validate(control: FormControl): { [key: string]: any } | null {
    if (!control.value) {
      if (control.dirty) {
        return { required: true };
      }
      else {
        return null;
      }
    }

    const pattern =  /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/;

    return pattern.test(control.value) ? null : { wrongFormat: true };
  }

	private onChange = data => {
	}
	private onTouched = data => {
	}

	public onChangeDate(data) {
		this.onChange(data.target.value);
	}
	
  public registerOnChange = fn => {
    this.onChange = fn;
  }

	public writeValue = (data) => {
		// console.log("writeValue: ", moment(data, 'DD/MM/YYYY'));

  }

  public registerOnTouched = () => {
    console.log("registerOnTouched");
  }
}
