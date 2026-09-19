export interface Municipio {
  idMunicipio?: number;
  idDepartamento: number;
  nombre: string;

  estado?: 'ACTIVO' | 'INACTIVO';
  
}
