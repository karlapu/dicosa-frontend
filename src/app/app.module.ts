import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RolesListComponent } from './features/roles/roles-list/roles-list.component';
import { RolesFormularioComponent } from './features/roles/roles-formulario/roles-formulario.component';
import { UsuariosListComponent } from './features/usuarios/usuarios-list/usuarios-list.component';
import { UsuariosFormularioComponent } from './features/usuarios/usuarios-formulario/usuarios-formulario.component';

@NgModule({
  declarations: [
    AppComponent,
    RolesListComponent,
    RolesFormularioComponent,
    UsuariosListComponent,
    UsuariosFormularioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
