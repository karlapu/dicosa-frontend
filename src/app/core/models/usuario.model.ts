export interface Usuario {
 idUsuario?: number;
 idRol: number | null;
 nombreRol?: string;
 username: string;
 password?: string;
 nombre: string;
 correo: string;
 estado?: 'ACTIVO' | 'INACTIVO';

}
