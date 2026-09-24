export interface Cliente {
  idCliente?: number;
  idMunicipio: number;
  nombreMunicipio?: string;
  nit?: string;
  nombre: string;
  telefono?: string;
  correo?: string;
  direccion?: string;
  estado?: 'ACTIVO' | 'INACTIVO';
}
