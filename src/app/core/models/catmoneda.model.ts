export interface CatMoneda {
  idMoneda?: number;
  nombre: string;
  simbolo: string;
  estado?: 'ACTIVO' | 'INACTIVO';
}
