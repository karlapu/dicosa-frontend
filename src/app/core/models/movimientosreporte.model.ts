export interface MovimientoReporte {
  fecha: string;
  tipo: string;
  referencia: string;
  producto: string;
  sucursal: string;
  entrada: number;
  salida: number;
  usuario?: string;
  descripcion?: string;
}

export interface MovimientosReporte {
  desde: string;
  hasta: string;
  totalEntradas: number;
  totalSalidas: number;
  movimientos: MovimientoReporte[];
}
 