export interface MovimientoInventario {
  idMovimiento?: number;

  idProducto: number;
  nombreProducto?: string;

  idTipoMovimiento: number;
  nombreTipoMovimiento?: string;

  idSucursalOrigen?: number | null;
  nombreSucursalOrigen?: string;

  idSucursalDestino?: number | null;
  nombreSucursalDestino?: string;

  cantidad: number;
  descripcion?: string;

  fechaMovimiento?: string;

  estado?: 'PENDIENTE' | 'PROCESADO' | 'CANCELADO';
}
