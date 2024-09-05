import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { sharedComponents } from '../../../../shared/shared-imports';
import { materialModules } from '../../../../modules/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControlName, ReactiveFormsModule, Validators } from '@angular/forms';
import { PessoaBaseComponent } from '../pessoa-form.base.component';
import { PessoaService } from '../../services/pessoa.service';
import { SnackbarService } from '../../../../shared/services/snackbar/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseSucessModel } from '../../../../core/models/response.model';
import { Patterns } from '../../../../shared/utils/pattern';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { cpfValidator, cnpjValidator } from '../../../../shared/utils/validadorCPFCNPJ' 

@Component({
  selector: 'app-adicionar-pessoa',
  standalone: true,
  imports: [    
    ReactiveFormsModule,
    CommonModule,
    ...materialModules,
    ...sharedComponents, 
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  templateUrl: './adicionar-pessoa.component.html',
  providers: provideNgxMask()
})
export class AdicionarPessoaComponent extends PessoaBaseComponent
implements OnInit, AfterViewInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements:
    | ElementRef[]
    | undefined;
  @ViewChildren('input') inputs: QueryList<ElementRef> | undefined;
  nomeLabel: string = 'Nome';
  mascara: string = '000.000.000-00';
  isPessoaJuridica: boolean = false;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private snackbarService: SnackbarService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      tipoPessoa: [
        1,
        [Validators.required],
      ],
      documento: [
        null,
        [
          Validators.required,
          Validators.pattern(Patterns.CPF_CNPJ_PATTERN),
        ],
      ],
      telefone: [
        null,
        [
          Validators.required,
          Validators.pattern(Patterns.PHONE_PATTERN),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
        ],
      ],
    });
  }

  ngAfterViewInit(): void {
    if (this.formInputElements)
      super.configurarValidacaoFormulario(this.formInputElements);
  }

  processarSucesso(response: ResponseSucessModel) {
    this.form.reset();
    this.errors = [];
    this.isLoading = true;
    this.snackbarService.showSnackbarSuccess(response.data);
    this.router.navigate(['/pessoa/']);
  }

  onSubmit() {
    if (this.form.dirty && this.form.valid) {
      this.isLoading = true;
      this.model = Object.assign(
        {},
        this.model,
        this.form.value
      );
      this.model.documento = this.formatarCPFCNPJ(this.model.documento);
      this.pessoaService
        .novo(this.model)
        .subscribe({
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

  limpar() {
    this.form.reset();
  }

  verificaJuridicaFisica(e: any): void {
    const input = e.value;
    var isCNPJ = input === 2;
    this.nomeLabel = isCNPJ ? 'Razão Social' : 'Nome'
    this.mascara =  isCNPJ ? '00.000.000/0000-00' : '000.000.000-00'
    this.isPessoaJuridica = isCNPJ;
  }

  verificaTelefone(e: Event){
    const input = e.target as HTMLInputElement;
  }

  verificaCPFCNPJ(e: Event){
    const input = e.target as HTMLInputElement;
    var existeErro = false;
    const control = this.form.get('documento');
    if(this.isPessoaJuridica){
      existeErro = cnpjValidator(input.value);
    }
    else{
      existeErro = cpfValidator(input.value);
    }
    if(existeErro)
      control?.setErrors({ formatoInvalido: true});
  }


  formatarCPFCNPJ(cpf: string): string {
    const documento = cpf.replace(/\D/g, ''); // Remove tudo que não é dígito
  
    if (documento.length <= 11) {
      return documento
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    if (documento.length <= 14) {
      return documento
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }
  
    return cpf;
  }
}
