export interface Proveedor {
  idproveedor?: number;
  idmunicipio: number;
  nombremunicipio?: string;
  nit?: string;
  nombreEmpresa: string;
  contacto?: string;
  telefono?: string;
  correo?: string;
  direccion?: string;
  estado?: 'ACTIVO' | 'INACTIVO';
}
