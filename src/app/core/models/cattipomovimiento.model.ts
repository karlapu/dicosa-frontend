export interface CatTipoMovimiento {
  idTipoMovimiento?: number;
  nombre: string;
  estado?: 'ACTIVO' | 'INACTIVO';
}
