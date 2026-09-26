import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesListComponent } from './features/roles/roles-list/roles-list.component';
import { RolesFormularioComponent } from './features/roles/roles-formulario/roles-formulario.component';
import { UsuariosListComponent } from './features/usuarios/usuarios-list/usuarios-list.component';
import { UsuariosFormularioComponent } from './features/usuarios/usuarios-formulario/usuarios-formulario.component';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './core/auth.guard';
import { MenusFormularioComponent } from './features/menus/menus-formulario/menus-formulario.component';
import { MenusListComponent } from './features/menus/menus-list/menus-list.component';
import { ModulosFormularioComponent } from './features/modulos/modulos-formulario/modulos-formulario.component';
import { ModulosListComponent } from './features/modulos/modulos-list/modulos-list.component';
import { AsignarPermisosComponent } from './features/permisos/asignar-permisos/asignar-permisos.component';
import { PermisosListComponent } from './features/permisos/permisos-list/permisos-list.component';
import { PermisosFormularioComponent } from './features/permisos/permisos-formulario/permisos-formulario.component';
import { DepartamentosFormularioComponent } from './features/departamentos/departamentos-formulario/departamentos-formulario.component';
import { DepartamentosListComponent } from './features/departamentos/departamentos-list/departamentos-list.component';
import { MunicipiosFormularioComponent } from './features/municipios/municipios-formulario/municipios-formulario.component';
import { MunicipiosListComponent } from './features/municipios/municipios-list/municipios-list.component';
import { CategoriasListComponent } from './features/categorias/categorias-list/categorias-list.component';
import { CategoriasFormularioComponent } from './features/categorias/categorias-formulario/categorias-formulario.component';
import { CatMetodoPagoListComponent } from './features/cat-metodos-pago/cat-metodos-pago-list/cat-metodos-pago-list.component';
import { CatMetodoPagoFormularioComponent } from './features/cat-metodos-pago/cat-metodos-pago-formulario/cat-metodos-pago-formulario.component';
import { CatMonedasListComponent } from './features/cat-monedas/cat-monedas-list/cat-monedas-list.component';
import { CatMonedasFormularioComponent } from './features/cat-monedas/cat-monedas-formulario/cat-monedas-formulario.component';
import { CatTiposMovimientoListComponent } from './features/cat-tipos-movimiento/cat-tipos-movimiento-list/cat-tipos-movimiento-list.component';
import { CatTiposMovimientoFormularioComponent } from './features/cat-tipos-movimiento/cat-tipos-movimiento-formulario/cat-tipos-movimiento-formulario.component';
import { CatTiposSucursalListComponent } from './features/cat-tipos-sucursal/cat-tipos-sucursal-list/cat-tipos-sucursal-list.component';
import { CatTiposSucursalFormularioComponent } from './features/cat-tipos-sucursal/cat-tipos-sucursal-formulario/cat-tipos-sucursal-formulario.component';
import { ProveedoresListComponent } from './features/proveedores/proveedores-list/proveedores-list.component';
import { ProveedoresFormularioComponent } from './features/proveedores/proveedores-formulario/proveedores-formulario.component';
import { SucursalesListComponent } from './features/sucursales/sucursales-list/sucursales-list.component';
import { SucursalesFormularioComponent } from './features/sucursales/sucursales-formulario/sucursales-formulario.component';
import { ClientesListComponent } from './features/clientes/clientes-list/clientes-list.component';
import { ClientesFormularioComponent } from './features/clientes/clientes-formulario/clientes-formulario.component';
import { ProductosListComponent } from './features/productos/productos-list/productos-list.component';
import { ProductosFormularioComponent } from './features/productos/productos-formulario/productos-formulario.component';
import { InventarioListComponent } from './features/inventario/inventario-list/inventario-list.component';
import { InventarioFormularioComponent } from './features/inventario/inventario-formulario/inventario-formulario.component';
import { MovimientosListComponent } from './features/movimientos/movimientos-list/movimientos-list.component';
import { MovimientosFormularioComponent } from './features/movimientos/movimientos-formulario/movimientos-formulario.component';
import { CatTiposInventarioListComponent } from './features/cat-tipos-inventario/cat-tipos-inventario-list/cat-tipos-inventario-list.component';
import { CatTiposInventarioFormularioComponent } from './features/cat-tipos-inventario/cat-tipos-inventario-formulario/cat-tipos-inventario-formulario.component';
import { ConfiguracionFormularioComponent } from './features/configuracion/configuracion-formulario/configuracion-formulario.component';

const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'roles', component: RolesListComponent, canActivate: [authGuard] },
  { path: 'roles/nuevo', component: RolesFormularioComponent, canActivate: [authGuard] },
  { path: 'roles/editar/:id', component: RolesFormularioComponent, canActivate: [authGuard] },
  { path: 'usuarios', component: UsuariosListComponent, canActivate: [authGuard] },
  { path: 'usuarios/nuevo', component: UsuariosFormularioComponent, canActivate: [authGuard] },
  { path: 'usuarios/editar/:id', component: UsuariosFormularioComponent, canActivate: [authGuard] },
  { path: 'modulos', component: ModulosListComponent, canActivate: [authGuard] },
{ path: 'modulos/nuevo', component: ModulosFormularioComponent, canActivate: [authGuard] },
{ path: 'modulos/editar/:id', component: ModulosFormularioComponent, canActivate: [authGuard] },
{ path: 'menus', component: MenusListComponent, canActivate: [authGuard] },
{ path: 'menus/nuevo', component: MenusFormularioComponent, canActivate: [authGuard] },
{ path: 'menus/editar/:id', component: MenusFormularioComponent, canActivate: [authGuard] },
{ path: 'permisos', component: PermisosListComponent, canActivate: [authGuard] },
{ path: 'permisos/nuevo', component: PermisosFormularioComponent, canActivate: [authGuard] },
{ path: 'permisos/editar/:id', component: PermisosFormularioComponent, canActivate: [authGuard] },
{ path: 'asignar-permisos', component: AsignarPermisosComponent, canActivate: [authGuard] },
{ path: 'departamentos', component: DepartamentosListComponent, canActivate: [authGuard] },
{ path: 'departamentos/nuevo', component: DepartamentosFormularioComponent, canActivate: [authGuard] },
{ path: 'departamentos/editar/:id', component: DepartamentosFormularioComponent, canActivate: [authGuard] },
{ path: 'municipios', component: MunicipiosListComponent, canActivate: [authGuard] },
{ path: 'municipios/nuevo', component: MunicipiosFormularioComponent, canActivate: [authGuard] },
{ path: 'municipios/editar/:id', component: MunicipiosFormularioComponent, canActivate: [authGuard] },
{ path: 'categorias', component: CategoriasListComponent, canActivate: [authGuard] },
{ path: 'categorias/nuevo', component: CategoriasFormularioComponent, canActivate: [authGuard] },
{ path: 'categorias/editar/:id', component: CategoriasFormularioComponent, canActivate: [authGuard] },
 { path: 'cat-metodos-pago', component: CatMetodoPagoListComponent, canActivate: [authGuard] },
  { path: 'cat-metodos-pago/nuevo', component: CatMetodoPagoFormularioComponent, canActivate: [authGuard] },
  { path: 'cat-metodos-pago/editar/:id', component: CatMetodoPagoFormularioComponent, canActivate: [authGuard] },
  { path: 'cat-monedas', component: CatMonedasListComponent, canActivate: [authGuard] },
{ path: 'cat-monedas/nuevo', component: CatMonedasFormularioComponent, canActivate: [authGuard] },
{ path: 'cat-monedas/editar/:id', component: CatMonedasFormularioComponent, canActivate: [authGuard] },
{ path: 'cat-tipos-movimiento', component: CatTiposMovimientoListComponent, canActivate: [authGuard] },
{ path: 'cat-tipos-movimiento/nuevo', component: CatTiposMovimientoFormularioComponent, canActivate: [authGuard] },
{ path: 'cat-tipos-movimiento/editar/:id', component: CatTiposMovimientoFormularioComponent, canActivate: [authGuard] },
{ path: 'cat-tipos-sucursal', component: CatTiposSucursalListComponent, canActivate: [authGuard] },
{ path: 'cat-tipos-sucursal/nuevo', component: CatTiposSucursalFormularioComponent, canActivate: [authGuard] },
{ path: 'cat-tipos-sucursal/editar/:id', component: CatTiposSucursalFormularioComponent, canActivate: [authGuard] },
{ path: 'proveedores', component: ProveedoresListComponent, canActivate: [authGuard] },
{ path: 'proveedores/nuevo', component: ProveedoresFormularioComponent, canActivate: [authGuard] },
{ path: 'proveedores/editar/:id', component: ProveedoresFormularioComponent, canActivate: [authGuard] },
{ path: 'sucursales', component: SucursalesListComponent, canActivate: [authGuard] },
{ path: 'sucursales/nuevo', component: SucursalesFormularioComponent, canActivate: [authGuard] },
{ path: 'sucursales/editar/:id', component: SucursalesFormularioComponent, canActivate: [authGuard] },
{ path: 'clientes', component: ClientesListComponent, canActivate: [authGuard] },
{ path: 'clientes/nuevo', component: ClientesFormularioComponent, canActivate: [authGuard] },
{ path: 'clientes/editar/:id', component: ClientesFormularioComponent, canActivate: [authGuard] },
{ path: 'productos', component: ProductosListComponent, canActivate: [authGuard] },
{ path: 'productos/nuevo', component: ProductosFormularioComponent, canActivate: [authGuard] },
{ path: 'productos/editar/:id', component: ProductosFormularioComponent, canActivate: [authGuard] },
{ path: 'inventario', component: InventarioListComponent, canActivate: [authGuard] },
{ path: 'inventario/nuevo', component: InventarioFormularioComponent, canActivate: [authGuard] },
{ path: 'inventario/editar/:id', component: InventarioFormularioComponent, canActivate: [authGuard] },
{ path: 'movimientos', component: MovimientosListComponent, canActivate: [authGuard] },
{ path: 'movimientos/nuevo', component: MovimientosFormularioComponent, canActivate: [authGuard] },
{ path: 'cat-tipos-inventario',component: CatTiposInventarioListComponent,canActivate: [authGuard]},
{path: 'cat-tipos-inventario/nuevo', component: CatTiposInventarioFormularioComponent, canActivate: [authGuard]},
{path: 'cat-tipos-inventario/editar/:id',component: CatTiposInventarioFormularioComponent,canActivate: [authGuard]},
{path: 'configuracion', component: ConfiguracionFormularioComponent, canActivate: [authGuard]}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
