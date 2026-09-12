export interface Menu {
  idMenu?: number;
  idModulo: number | null;
  nombreModulo?: string;
  nombre: string;
  ruta?: string;
  estado?: 'ACTIVO' | 'INACTIVO';
}
