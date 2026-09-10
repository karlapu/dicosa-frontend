import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../core/models/usuario.model';
import { Rol } from '../../../core/models/rol.model';
import { UsuarioService } from '../../../core/services/usuario.service';
import { RolService } from '../../../core/services/rol.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-formulario',
  standalone: false,
  templateUrl: './usuarios-formulario.component.html',
  styleUrl: './usuarios-formulario.component.css'
})
export class UsuariosFormularioComponent implements OnInit {

  usuario: Usuario = { idRol: null, username: '', nombre: '', correo: '' };
  roles: Rol[] = [];
  modoEdicion = false;
  idUsuario: number | null = null;
  guardando = false;
  error = '';

  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarRoles();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.idUsuario = Number(idParam);
      this.cargarUsuario(this.idUsuario);
    }
  }

  cargarRoles(): void {
    this.rolService.listarTodos().subscribe({
      next: (data) => this.roles = data,
      error: () => this.error = 'No se pudieron cargar los roles.'
    });
  }

  cargarUsuario(id: number): void {
    this.usuarioService.buscarPorId(id).subscribe({
      next: (data) => this.usuario = data,
      error: () => this.error = 'No se pudo cargar la información del usuario.'
    });
  }

  guardar(): void {
    this.guardando = true;
    this.error = '';

    const peticion = this.modoEdicion && this.idUsuario
      ? this.usuarioService.actualizar(this.idUsuario, this.usuario)
      : this.usuarioService.crear(this.usuario);

    peticion.subscribe({
      next: () => this.router.navigate(['/usuarios']),
      error: (err) => {
        this.error = err.error?.mensaje || 'Ocurrió un error al guardar el usuario.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }
}
