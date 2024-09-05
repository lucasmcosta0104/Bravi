import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GridConfig } from '../../guid-components/grid-config.model';
import { Router } from '@angular/router';
import { GridComponent } from '../../guid-components/grid-component/grid.component';
import { materialModules } from '../../../../modules/material.module';

@Component({
  selector: 'app-form-grid-contato',
  standalone: true,
  imports: [...materialModules, GridComponent],
  templateUrl: './form-grid-contato.component.html'
})

export class FormGridContatoComponent implements OnInit {
  @Input() idPessoa!: string;
  @Output() excluir = new EventEmitter<string>()
  constructor(private router: Router) {}
  gridConfig!: GridConfig;

  ngOnInit(): void {
    this.gridConfig = {
      apiUrl: 'Contato/Filter/' + (this.idPessoa ? this.idPessoa : ''),
      filterOrder: {
        Name: 'Nome',
        Tipo: 'asc'
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
      actionAdicionar: () => {
        this.router.navigate(['/contato/cadastrar/' + this.idPessoa]);
      },
      actionEditar: (id: string) => {
        this.router.navigate(["/contato/editar/" + id]);
      },
      actionExcluir: async (id: string) => {
        await this.excluirContato(id);
      },
    };

  }

  async excluirContato(id: string){
    await this.excluir.emit(id);
 }
}