export interface DetalleCompra {
  idDetalleCompra?: number;
  idProducto: number | null;
  nombreProducto?: string;
  cantidad: number | null;
  precioUnitario: number | null;
  subtotal?: number;
}

export interface Compra {
  idCompra?: number;
  idProveedor: number | null;
  nombreProveedor?: string;
  idSucursal: number | null;
  nombreSucursal?: string;
  idUsuario?: number;
  nombreUsuario?: string;
  fechaCompra?: string;
  subtotal?: number;
  total?: number;
  estado?: 'PENDIENTE' | 'COMPLETADA' | 'CANCELADA';
  detalles: DetalleCompra[];
}
