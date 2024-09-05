import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBaseComponent } from '../../../shared/components/form-base-components/form-base.component';
import { ContatoModel } from '../models/contato.model';

export abstract class ContatoBaseComponent extends FormBaseComponent {
  model: ContatoModel = {} as ContatoModel;
  errors: any[] = [];
  form: FormGroup = {} as FormGroup;
  isLoading = false;

  constructor() {
    super();

    this.validationMessages = {
      nome: {
        required: 'Campo Obrigatório',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 100 caracteres',
      },
      telefone: {
        required: 'Campo Obrigatório'
      },
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
    super.configurarValidacaoFormularioBase(
      formInputElements,
      this.form
    );
  }
}
