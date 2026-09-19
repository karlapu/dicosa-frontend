import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RolesListComponent } from './features/roles/roles-list/roles-list.component';
import { RolesFormularioComponent } from './features/roles/roles-formulario/roles-formulario.component';
import { UsuariosListComponent } from './features/usuarios/usuarios-list/usuarios-list.component';
import { UsuariosFormularioComponent } from './features/usuarios/usuarios-formulario/usuarios-formulario.component';
import { LoginComponent } from './features/login/login.component';
import { authInterceptor } from './core/auth.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ModulosListComponent } from './features/modulos/modulos-list/modulos-list.component';
import { ModulosFormularioComponent } from './features/modulos/modulos-formulario/modulos-formulario.component';
import { MenusListComponent } from './features/menus/menus-list/menus-list.component';
import { MenusFormularioComponent } from './features/menus/menus-formulario/menus-formulario.component';
import { PermisosListComponent } from './features/permisos/permisos-list/permisos-list.component';
import { PermisosFormularioComponent } from './features/permisos/permisos-formulario/permisos-formulario.component';
import { AsignarPermisosComponent } from './features/permisos/asignar-permisos/asignar-permisos.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { DepartamentosListComponent } from './features/departamentos/departamentos-list/departamentos-list.component';
import { DepartamentosFormularioComponent } from './features/departamentos/departamentos-formulario/departamentos-formulario.component';
import { MunicipiosFormularioComponent } from './features/municipios/municipios-formulario/municipios-formulario.component';
import { MunicipiosListComponent } from './features/municipios/municipios-list/municipios-list.component';
import { CategoriasListComponent } from './features/categorias/categorias-list/categorias-list.component';
import { CategoriasFormularioComponent } from './features/categorias/categorias-formulario/categorias-formulario.component';
import { CatMetodoPagoFormularioComponent } from './features/cat-metodos-pago/cat-metodos-pago-formulario/cat-metodos-pago-formulario.component';
import { CatMetodoPagoListComponent } from './features/cat-metodos-pago/cat-metodos-pago-list/cat-metodos-pago-list.component';



@NgModule({
  declarations: [
    AppComponent,
    RolesListComponent,
    RolesFormularioComponent,
    UsuariosListComponent,
    UsuariosFormularioComponent,
    LoginComponent,
    ModulosListComponent,
    ModulosFormularioComponent,
    MenusListComponent,
    MenusFormularioComponent,
    PermisosListComponent,
    PermisosFormularioComponent,
    AsignarPermisosComponent,
    SidebarComponent,
    DepartamentosListComponent,
    DepartamentosFormularioComponent,
    MunicipiosFormularioComponent,
    MunicipiosListComponent,
    CategoriasListComponent,
    CategoriasFormularioComponent,
    CatMetodoPagoListComponent,
    CatMetodoPagoFormularioComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,


    FormsModule
  ],
  providers: [

     provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
