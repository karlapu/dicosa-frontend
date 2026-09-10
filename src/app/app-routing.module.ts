import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesListComponent } from './features/roles/roles-list/roles-list.component';
import { RolesFormularioComponent } from './features/roles/roles-formulario/roles-formulario.component';
import { UsuariosListComponent } from './features/usuarios/usuarios-list/usuarios-list.component';
import { UsuariosFormularioComponent } from './features/usuarios/usuarios-formulario/usuarios-formulario.component';

const routes: Routes = [
{ path: '', redirectTo: 'roles', pathMatch: 'full' },
{ path: 'roles', component: RolesListComponent },
{ path: 'roles/nuevo', component: RolesFormularioComponent },
 { path: 'roles/editar/:id', component: RolesFormularioComponent },
 { path: 'usuarios', component: UsuariosListComponent },
  { path: 'usuarios/nuevo', component: UsuariosFormularioComponent },
  { path: 'usuarios/editar/:id', component: UsuariosFormularioComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
