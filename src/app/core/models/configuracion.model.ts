export interface Configuracion {
  idConfiguracion?: number;
  idMoneda: number | null;
  nombreMoneda?: string;
  idTipoInventario: number | null;
  nombreTipoInventario?: string;
  nombreEmpresa: string;
  telefono?: string;
  direccion?: string;
}
