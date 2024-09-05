import { Routes } from '@angular/router';
import { ListarPessoaComponent } from './pages/listar-pessoa/listar-pessoa.component';
import { PessoaGuard } from './services/pessoa.guard';
import { AdicionarPessoaComponent } from './pages/adicionar-pessoa/adicionar-pessoa.component';
import { EditarPessoaComponent } from './pages/editar-pessoa/editar-pessoa.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListarPessoaComponent,
        canActivate: [PessoaGuard],
        data: [{ claim: { nome: 'Pessoa', valor: 'Pessoa' } }],
      },
      {
        path: 'cadastrar',
        component: AdicionarPessoaComponent,
        canActivate: [PessoaGuard],
        data: [{ claim: { nome: 'Pessoa', valor: 'Cadastrar' } }],
      },
      {
        path: 'editar/:id',
        component: EditarPessoaComponent,
        canActivate: [PessoaGuard],
        data: [{ claim: { nome: 'Pessoa', valor: 'Editar' } }],
      },
    ],
  },
];

export default routes;
