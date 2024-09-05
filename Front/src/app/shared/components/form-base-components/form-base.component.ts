/* eslint-disable prefer-const */
import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, fromEvent, merge } from 'rxjs';
import {
  DisplayMessage,
  GenericValidator,
  ValidationMessages,
} from '../../utils/generic-form-validation';

export abstract class FormBaseComponent {
  displayMessage: DisplayMessage = {};
  genericValidator: GenericValidator = {} as GenericValidator;
  validationMessages: ValidationMessages = {} as ValidationMessages;
  protected configurarMensagensValidacaoBase(
    validationMessages: ValidationMessages
  ) {
    this.genericValidator = new GenericValidator(validationMessages);
  }

  protected configurarValidacaoFormularioBase(
    formInputElements: ElementRef[],
    formGroup: FormGroup
  ) {
    let controlBlurs: Observable<any>[] = formInputElements.map(
      (formControl: ElementRef) =>
        merge(
          fromEvent(formControl.nativeElement, 'input'),
          fromEvent(formControl.nativeElement, 'blur')
        )
    );

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario(formGroup);
    });
  }

  protected validarFormulario(formGroup: FormGroup) {
    this.displayMessage = this.genericValidator.processarMensagens(formGroup);
  }
}
