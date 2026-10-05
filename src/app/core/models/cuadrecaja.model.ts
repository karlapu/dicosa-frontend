export interface TotalPorMetodo {
  nombreMetodoPago: string;
  total: number;
}

export interface CuadreVendedor {
  idUsuario: number;
  nombreUsuario: string;
  cantidadVentas: number;
  totalVendido: number;
  totalesPorMetodo: TotalPorMetodo[];
}

export interface CuadreCaja {
  fecha: string;
  totalGeneral: number;
  vendedores: CuadreVendedor[];
}
