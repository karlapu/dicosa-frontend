export interface DetallePago {
  idDetallePago?: number;
  idMetodoPago: number | null;
  nombreMetodoPago?: string;
  monto: number | null;
}

export interface Pago {
  idPago?: number;
  idVenta: number | null;
  nombreCliente?: string;
  totalVenta?: number;
  fechaPago?: string;
  totalPagado?: number;
  estado?: 'PENDIENTE' | 'PAGADO' | 'ANULADO';
  detalles: DetallePago[];
}

export interface SaldoVenta {
  idVenta: number;
  totalVenta: number;
  totalPagado: number;
  saldoPendiente: number;
}
