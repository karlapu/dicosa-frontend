export interface Rol {
  idRol?: number;
  nombre: string;
  descripcion?: string;
  estado?: 'ACTIVO' | 'INACTIVO';
}
