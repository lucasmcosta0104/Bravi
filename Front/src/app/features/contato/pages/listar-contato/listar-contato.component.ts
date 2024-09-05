import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GridConfig } from '../../../../shared/components/guid-components/grid-config.model';
import { SnackbarService } from '../../../../shared/services/snackbar/snackbar.service';
import { sharedComponents } from '../../../../shared/shared-imports';

import { GridComponent } from '../../../../shared/components/guid-components/grid-component/grid.component';
import { ContatoBaseComponent } from '../contato-form.base.component';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-listar-contato',
  standalone: true,
  imports: [...sharedComponents, GridComponent],
  templateUrl: './listar-contato.component.html',
})
export class ListarContatoComponent extends ContatoBaseComponent {
  constructor(
    private contatoService: ContatoService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
    super();
  }

  gridConfig: GridConfig = {
    apiUrl: 'Contato/Filter',
    filterOrder: {
      Name: 'Nome',
      Tipo: 'asc',
    },
    filterItens: [
      {
        Name: 'nome',
        Field: 'Nome ',
        Null: true,
        Tipo: 'string',
      },
      {
        Name: 'telefone',
        Field: 'Telefone',
        Null: false,
        Tipo: 'string',
      },
      {
        Name: 'whatsApp',
        Field: 'WhatsApp',
        Null: false,
        Tipo: 'string',
      },
      {
        Name: 'email',
        Field: 'Email',
        Null: false,
        Tipo: 'string',
      },
      { Name: 'dataCriacao', Field: 'Data Criacão', Null: true, Tipo: 'data' },
    ],
    actionEditar: (id: string) => {
      this.router.navigate(['/contato/editar/' + id]);
    },
    actionExcluir: async (id: string) => {
      await this.excluirContato(id);
    },
  };

  async excluirContato(id: string): Promise<void> {
    await this.contatoService.excluir(id).subscribe({
      next: (sucesso: any) => {
        this.processarSucesso(sucesso);
      },
      error: (falha: any) => {
        this.processarFalha(falha);
      },
    });
  }

  processarSucesso(response: any) {
    this.snackbarService.showSnackbarSuccess(response.data);
  }

  processarFalha(fail: any) {
    console.log(fail);
  }
}
