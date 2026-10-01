export interface DetalleVenta {
  idDetalleVenta?: number;
  idProducto: number | null;
  nombreProducto?: string;
  cantidad: number | null;
  precioUnitario: number | null;
  costoUnitario?: number;
  subtotal?: number;
}

export interface Venta {
  idVenta?: number;
  idCliente: number | null;
  nombreCliente?: string;
  idSucursal: number | null;
  nombreSucursal?: string;
  idUsuario?: number;
  nombreUsuario?: string;
  fechaVenta?: string;
  subtotal?: number;
  descuento?: number;
  total?: number;
  estado?: 'PROFORMA' | 'VENDIDA' | 'ANULADA';
  detalles: DetalleVenta[];
}
