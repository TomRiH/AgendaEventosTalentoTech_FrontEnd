import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { EventoComponent } from './components/evento/evento.component';
import { EmprendimientoComponent } from './components/emprendimiento/emprendimiento.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '',
    component: LoginComponent
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'eventos',
    component: EventoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'emprendimientos',
    component: EmprendimientoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categorias',
    component: CategoriaComponent,
    canActivate: [AuthGuard]
  },
  { path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
