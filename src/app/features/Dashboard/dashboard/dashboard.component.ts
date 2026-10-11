import { Component, OnInit } from '@angular/core';
import { Dashboard, Punto } from '../../../core/models/dashboard.model';
import { Sucursal } from '../../../core/models/sucursal.model';
import { DashboardService } from '../../../core/services/dashboard.service';
import { SucursalService } from '../../../core/services/sucursal.service';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  datos: Dashboard | null = null;
  cargando = false;
  error = '';
  hoy = new Date();
  idSucursal: number | null = null;
  sucursales: Sucursal[] = [];
  periodo = 'MES';
  desde = '';
  hasta = '';
  readonly periodos = [
    { clave: 'HOY', texto: 'Hoy' },
    { clave: 'AYER', texto: 'Ayer' },
    { clave: 'SEMANA', texto: 'Semana' },
    { clave: 'MES', texto: 'Mes' }
  ];

  constructor(
    private dashboardService: DashboardService,
    private sucursalService: SucursalService
  ) { }

  ngOnInit(): void {
    this.sucursalService.listarTodos().subscribe({
      next: (data) => (this.sucursales = data),
      error: () => (this.sucursales = [])
    });
    this.elegirPeriodo('MES');
  }

  elegirPeriodo(clave: string): void {
    const hoy = new Date();
    let inicio = new Date(hoy);
    let fin = new Date(hoy);
    if (clave === 'AYER') {
      inicio.setDate(hoy.getDate() - 1);
      fin = new Date(inicio);
    } else if (clave === 'SEMANA') {
      inicio.setDate(hoy.getDate() - 6);
    } else if (clave === 'MES') {
      inicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    }
    this.periodo = clave;
    this.desde = this.formatear(inicio);
    this.hasta = this.formatear(fin);
    this.cargar();
  }

  aplicarRango(): void {
    if (!this.desde || !this.hasta) {
      return;
    }
    this.periodo = 'RANGO';
    this.cargar();
  }

  private formatear(fecha: Date): string {
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${fecha.getFullYear()}-${mes}-${dia}`;
  }

  textoPeriodo(): string {
    const lista = this.periodos.find((p) => p.clave === this.periodo);
    if (lista && this.periodo === 'HOY') {
      return 'hoy';
    }
    if (lista && this.periodo === 'AYER') {
      return 'ayer';
    }
    return 'del ' + this.formatoCorto(this.desde) + ' al ' + this.formatoCorto(this.hasta);
  }

  private formatoCorto(iso: string): string {
    const [anio, mes, dia] = iso.split('-');
    return `${dia}/${mes}/${anio}`;
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.dashboardService.obtener(this.idSucursal, this.desde, this.hasta).subscribe({
      next: (data) => {
        this.datos = data;
        this.hoy = new Date();
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el panel de control';
        this.cargando = false;
      }
    });
  }

  porcentaje(valor: number, lista: Punto[]): number {
    const maximo = Math.max(0, ...lista.map((p) => p.valor));
    return maximo > 0 ? Math.round((valor / maximo) * 100) : 0;
  }

  sinVentas(lista: Punto[]): boolean {
    return lista.every((p) => p.valor === 0);
  }

  mostrarValores(lista: Punto[]): boolean {
    return lista.length <= 10;
  }
}
