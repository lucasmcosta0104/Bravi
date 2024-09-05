/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Component, Input, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { materialModules } from '../../../modules/material.module';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ...materialModules],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
})
export class TextFieldComponent implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() validators: ValidatorFn[] = [];
  value!: string;
  disabled = false;
  onChange: any = (value: any) => {};
  onTouched: any = () => {};
  control: AbstractControl = {} as AbstractControl;

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.control) this.control = control;
    if (!control.value || control.value === '') {
      return { required: true };
    }
    return null;
  }
}
