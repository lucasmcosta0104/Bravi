import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaBaseComponent } from '../pessoa-form.base.component';
import { PessoaService } from '../../services/pessoa.service';
import { SnackbarService } from '../../../../shared/shared.index';
import { ActivatedRoute, Router } from '@angular/router';
import { GridConfig } from '../../../../shared/components/guid-components/grid-config.model';
import { GridComponent } from '../../../../shared/components/guid-components/grid-component/grid.component';
import { sharedComponents } from '../../../../shared/shared-imports';

@Component({
  selector: 'app-listar-pessoa',
  standalone: true,
  imports: [...sharedComponents, GridComponent],
  templateUrl: './listar-pessoa.component.html'
})

export class ListarPessoaComponent extends PessoaBaseComponent implements OnInit{
  @ViewChild(GridComponent) gridComponent!: GridComponent;

  constructor(
    private pessoaService: PessoaService, 
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router) {
    super();
  }
  gridConfig!: GridConfig;

  ngOnInit(): void {

    this.gridConfig = this.iniciarGrid();
  }

  iniciarGrid(){
    return {
      apiUrl: 'Pessoa/Filter',
      filterOrder: {
        Name: 'Nome',
        Tipo: 'asc'
      },
      filterItens: [
        { Name: 'nome', Field: 'Nome/Razão Social', Null: false, Tipo: 'string' },
        { Name: 'documento', Field: 'CPF/CNPJ', Null: true, Tipo: 'string' },
        { Name: 'email', Field: 'E-mail', Null: true, Tipo: 'string' },
        { Name: 'dataCriacao', Field: 'Data Criacão', Null: true, Tipo: 'data' },
        { Name: 'tipoPessoa', Field: 'Tipo Pessoa', Null: true, Tipo: 'enum', 
          valueEnums: [ 
            { label: "Todos", value: 0 },
            { label: "Física", value: 1 },
            { label: "Jurídica", value: 2 },
          ],
          defaultValue: 0
        },
      ],
      actionAdicionar: () => {
        this.router.navigate(['/pessoa/cadastrar/' ]);
      },
      actionEditar: (id: string) => {
        this.router.navigate(["/pessoa/editar/" + id]);
      },
      actionExcluir: async (id: string) => {
        await this.excluirPessoa(id);
      },
    };
  }

  async excluirPessoa(id: string): Promise<void>{
    await this.pessoaService.excluir(id).subscribe({
      next: (sucesso: any) => {
        this.processarSucesso(sucesso);
      },
      error: (falha: any) => {
        this.processarFalha(falha);
      },
    })
  }


processarSucesso(response: any) {
  this.snackbarService.showSnackbarSuccess(response.data);
}

processarFalha(fail: any) {
  console.log(fail);
}

}