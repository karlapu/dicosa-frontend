export interface Producto {
  idProducto?: number;
  idCategoria: number;
  nombreCategoria?: string;
  codigoBarra?: string;
  nombre: string;
  descripcion?: string;
  precioCosto: number;
  precioVenta: number;
  stockMinimo?: number;
  imagen?: string;
  estado?: 'ACTIVO' | 'INACTIVO';
}
