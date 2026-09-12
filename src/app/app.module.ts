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
    MenusFormularioComponent
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
