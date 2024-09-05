import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBaseComponent } from '../../../shared/components/form-base-components/form-base.component';
import { PessoaModel } from '../models/pessoa.model';
import { CustomErrorStateMatcher } from '../../../core/custom-error-state-matcher';

export abstract class PessoaBaseComponent extends FormBaseComponent {
  model: PessoaModel = {} as PessoaModel;
  errors: any[] = [];
  form: FormGroup = {} as FormGroup;
  isLoading = false;
  matcher = new CustomErrorStateMatcher();

  constructor() {
    super();

    this.validationMessages = {
      nome: {
        required: 'Campo Obrigatório',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 100 caracteres',
      },
      tipoPessoa: {
        required: 'Campo Obrigatório',
      },
      documento: {
        required: 'Campo Obrigatório',
        formatoInvalido: 'Formato inválido',
      },
      telefone: {
        required: 'Campo Obrigatório',
        Pattern: 'Formato inválido',
      },
      email: {
        required: 'Campo Obrigatório',
        email: 'Formato de e-mail inválido',
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
