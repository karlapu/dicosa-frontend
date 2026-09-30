export interface Auditoria {
  idAuditoria: number;
  idUsuario: number;
  nombreUsuario: string;
  tablaAfectada: string;
  registroAfectado?: number;
  accion: string;
  descripcion?: string;
  ipUsuario?: string;
  fechaEvento: string;
}
