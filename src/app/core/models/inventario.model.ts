export interface Inventario {
  idInventario?: number;
  idProducto: number;
  nombreProducto?: string;
  idSucursal: number;
  nombreSucursal?: string;
  cantidad: number;
  ultimaActualizacion?: string;
  estado?: 'ACTIVO' | 'INACTIVO';
}
