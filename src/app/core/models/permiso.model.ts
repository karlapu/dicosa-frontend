export interface Permiso {
  idPermiso?: number;
  idMenu: number | null;
  nombreMenu?: string;
  nombre: string;
  descripcion?: string;
  estado?: 'ACTIVO' | 'INACTIVO';
}
 