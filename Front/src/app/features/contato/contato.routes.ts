import { Routes } from "@angular/router";
import { ContatoGuard } from "./services/contatoguard";
import { AdicionarContatoComponent } from "./pages/adicionar-contato/adicionar-contato.component";
import { EditarContatoComponent } from "./pages/editar-contato/editar-contato.component";
import { ListarContatoComponent } from "./pages/listar-contato/listar-contato.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cadastrar',
        component: AdicionarContatoComponent,
        canActivate: [ContatoGuard],
        data: [{ claim: { nome: 'Contato', valor: 'Cadastrar' } }],
      },
      {
        path: 'cadastrar/:id',
        component: AdicionarContatoComponent,
        canActivate: [ContatoGuard],
        data: [{ claim: { nome: 'Contato', valor: 'Cadastrar' } }],
      },
      {
        path: 'editar/:id',
        component: EditarContatoComponent,
        canActivate: [ContatoGuard],
        data: [{ claim: { nome: 'Contato', valor: 'Editar' } }],
      },
      {
        path: '',
        component: ListarContatoComponent,
        canActivate: [ContatoGuard],
        data: [{ claim: { nome: 'Contato', valor: 'Contato' } }],
      },
    ],
  },
];

export default routes;