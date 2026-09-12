import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesListComponent } from './features/roles/roles-list/roles-list.component';
import { RolesFormularioComponent } from './features/roles/roles-formulario/roles-formulario.component';
import { UsuariosListComponent } from './features/usuarios/usuarios-list/usuarios-list.component';
import { UsuariosFormularioComponent } from './features/usuarios/usuarios-formulario/usuarios-formulario.component';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './core/auth.guard';

const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'roles', component: RolesListComponent, canActivate: [authGuard] },
  { path: 'roles/nuevo', component: RolesFormularioComponent, canActivate: [authGuard] },
  { path: 'roles/editar/:id', component: RolesFormularioComponent, canActivate: [authGuard] },
  { path: 'usuarios', component: UsuariosListComponent, canActivate: [authGuard] },
  { path: 'usuarios/nuevo', component: UsuariosFormularioComponent, canActivate: [authGuard] },
  { path: 'usuarios/editar/:id', component: UsuariosFormularioComponent, canActivate: [authGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
