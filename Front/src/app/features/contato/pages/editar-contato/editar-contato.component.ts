import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControlName,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { materialModules } from '../../../../modules/material.module';
import { SnackbarService } from '../../../../shared/services/snackbar/snackbar.service';
import { sharedComponents } from '../../../../shared/shared-imports';

import { CustomErrorStateMatcher } from '../../../../core/custom-error-state-matcher';
import { ContatoService } from '../../services/contato.service';
import { ContatoBaseComponent } from '../contato-form.base.component';


@Component({
  selector: 'app-editar-contato',
  standalone: true,
  imports: [
    ...materialModules,
    ...sharedComponents,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './editar-contato.component.html',
})
export class EditarContatoComponent
  extends ContatoBaseComponent
  implements OnInit, AfterViewInit
{
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements:
    | ElementRef[]
    | undefined;
  @ViewChildren('input') inputs: QueryList<ElementRef> | undefined;
  id: string | null = null;
  matcher = new CustomErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private contatoService: ContatoService,
    private ngZone: NgZone,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngAfterViewInit(): void {
    if (this.formInputElements)
      super.configurarValidacaoFormulario(this.formInputElements);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = String(params.get('id'));
    });
    this.form = this.fb.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(2),
        ],
      ],
      telefone: [
        null,
        [Validators.required, Validators.maxLength(15), Validators.minLength(14)],
      ],
      whatsApp: [null],
      email: [null],
    });
    this.onObter();
  }

  onSubmit() {
    if (this.form.valid && this.form.dirty) {
      this.isLoading = true;
      this.model = Object.assign({}, this.model, this.form.value);
      this.contatoService.adicionarContato(this.model).subscribe({
        next: (sucesso: any) => {
          this.processarSucesso(sucesso);
        },
        error: () => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  onObter() {
    if (this.id) {
      this.contatoService.obterPorId(this.id).subscribe({
        next: (response: any) => {
          response = response.data;
          this.form.patchValue({
            nome: response.nome,
            telefone: response.telefone,
            whatsApp: response.whatsApp,
            email: response.email,
            pessoaId: response.pessoaId,
          });
        },
        error: (falha: any) => {
          console.log(falha);
        },
      });
    }
  }

  processarSucesso(response: any) {
    this.isLoading = false;
    this.form.reset();
    this.snackbarService.showSnackbarSuccess(response.data);
    this.voltar();
  }

  voltar() {
    this.router.navigate([history.back()]);
  }
}
