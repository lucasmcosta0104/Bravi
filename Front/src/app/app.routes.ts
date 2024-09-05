import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout-component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'pessoa', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'pessoa',
        loadChildren: () => import('./features/pessoa/pessoa.routes'),
      },
      {
        path: 'contato',
        loadChildren: () => import('./features/contato/contato.routes'),
      },
    ],
  },
  { path: 'nao-encontrado', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];
