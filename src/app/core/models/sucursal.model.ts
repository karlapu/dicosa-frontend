export interface Sucursal {
  idSucursal?: number;
  idTipoSucursal: number;
  nombreTipoSucursal?: string;
  idMunicipio: number;
  nombreMunicipio?: string;
  nombre: string;
  direccion?: string;
  telefono?: string;
  estado?: 'ACTIVO' | 'INACTIVO';
}
