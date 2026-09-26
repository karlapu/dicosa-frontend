export interface CatTipoInventario {
  idTipoInventario?: number;
  nombre: string;
  estado?: 'ACTIVO' | 'INACTIVO';
}
