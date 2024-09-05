import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { ListarPessoaComponent } from '../features/pessoa/pages/listar-pessoa/listar-pessoa.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pessoa',
        component: ListarPessoaComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

export default routes;
