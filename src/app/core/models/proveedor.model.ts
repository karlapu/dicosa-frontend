export interface Proveedor {
  idProveedor?: number;
  idMunicipio: number;
  nombreMunicipio?: string;
  nit?: string;
  nombreEmpresa: string;
  contacto?: string;
  telefono?: string;
  correo?: string;
  direccion?: string;
  estado?: 'ACTIVO' | 'INACTIVO';
}
