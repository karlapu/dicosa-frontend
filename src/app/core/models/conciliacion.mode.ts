export interface ConciliacionFila {
  producto: string;
  sucursal: string;
  stockInventario: number;
  stockLotes: number;
  diferencia: number;
  cuadra: boolean;
}

export interface Conciliacion {
  totalRegistros: number;
  registrosConDiferencia: number;
  totalInventario: number;
  totalLotes: number;
  filas: ConciliacionFila[];
}
 