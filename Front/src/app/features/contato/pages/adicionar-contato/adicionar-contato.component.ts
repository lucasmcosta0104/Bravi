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
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CustomErrorStateMatcher } from '../../../../core/custom-error-state-matcher';
import { materialModules } from '../../../../modules/material.module';
import { SnackbarService } from '../../../../shared/services/snackbar/snackbar.service';
import { sharedComponents } from '../../../../shared/shared-imports';
import { ContatoBaseComponent } from '../contato-form.base.component';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-adicionar-contato',
  standalone: true,
  imports: [
    ...materialModules,
    ...sharedComponents,
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './adicionar-contato.component.html',
  providers: [provideNgxMask()],
})
export class AdicionarContatoComponent
  extends ContatoBaseComponent
  implements OnInit, AfterViewInit
{
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements:
    | ElementRef[]
    | undefined;
  @ViewChildren('input') inputs: QueryList<ElementRef> | undefined;
  matcher = new CustomErrorStateMatcher();
  id!: string;

  constructor(
    private fb: FormBuilder,
    private contatoService: ContatoService,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
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
        [Validators.required],
      ],
      whatsApp: [null],
      email: [null],
    });
  }

  onSubmit() {
    if (this.form.valid && this.form.dirty) {
      this.isLoading = true;
      this.model = Object.assign({}, this.model, this.form.value);
      this.model.pessoaId = this.id;

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

  processarSucesso(response: any) {
    this.isLoading = false;
    this.form.reset();
    this.snackbarService.showSnackbarSuccess(response.data);
    this.voltar();
  }

  voltar() {
    this.router.navigate([history.back()]);
  }

  limpar() {
    this.form.reset();
  }
}
