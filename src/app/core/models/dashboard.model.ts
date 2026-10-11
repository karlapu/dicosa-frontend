export interface Punto {
  etiqueta: string;
  valor: number;
}

export interface AlertaStock {
  producto: string;
  stock: number;
  stockMinimo: number;
}

export interface Dashboard {
  desde: string;
  hasta: string;
  ventasPeriodo: number;
  cantidadVentasPeriodo: number;
  stockTotal: number;
  valorInventario: number;
  productosBajoMinimo: number;
  registrosDescuadrados: number;
  ventasPorDia: Punto[];
  stockPorSucursal: Punto[];
  ventasPorVendedor: Punto[];
  productosMasVendidos: Punto[];
  alertasStock: AlertaStock[];
}
 