import { Component, OnInit } from '@angular/core';
import { CuadreCaja } from '../../../core/models/cuadrecaja.model';
import { MovimientosReporte } from '../../../core/models/movimientosreporte.model';
import { Sucursal } from '../../../core/models/sucursal.model';
import { ReporteService } from '../../../core/services/Reporte.service';
import { SucursalService } from '../../../core/services/sucursal.service';


type TipoColumna = 'texto' | 'moneda' | 'entero' | 'centro';


interface ConfigReporte {
  titulo: string;
  subtitulo: string;
  archivo: string;
  encabezados: string[];
  tipos: TipoColumna[];
  filas: (string | number)[][];
  totales: (string | number)[];
  pendiente?: number;
  orientacion: 'portrait' | 'landscape';
}

@Component({
  selector: 'app-cuadre-caja',
  standalone: false,
  templateUrl: './cuadre-caja.component.html',
  styleUrl: './cuadre-caja.component.css'
})
export class CuadreCajaComponent implements OnInit {

  tiposReporte = [
    { valor: 'CUADRE_CAJA', nombre: 'Cuadre de caja' },
    { valor: 'MOVIMIENTOS', nombre: 'Movimientos de inventario' }
  ];
  tipoReporte = 'CUADRE_CAJA';

  // Cuadre de caja
  fecha: string = this.obtenerFechaHoy();
  cuadre: CuadreCaja | null = null;

  // Movimientos de inventario
  desde: string = this.obtenerPrimerDiaMes();
  hasta: string = this.obtenerFechaHoy();
  idSucursal: number | null = null;
  sucursales: Sucursal[] = [];
  movimientos: MovimientosReporte | null = null;

  cargando = false;
  error = '';

  constructor(
    private reporteService: ReporteService,
    private sucursalService: SucursalService
  ) { }

  ngOnInit(): void {
    this.sucursalService.listarTodos().subscribe({
      next: (data) => (this.sucursales = data),
      error: () => (this.sucursales = [])
    });
    this.buscar();
  }


  private aIso(fecha: Date): string {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }

  obtenerFechaHoy(): string {
    return this.aIso(new Date());
  }

  obtenerPrimerDiaMes(): string {
    const hoy = new Date();
    return this.aIso(new Date(hoy.getFullYear(), hoy.getMonth(), 1));
  }


  private formatearFecha(fechaIso: string): string {
    const [anio, mes, dia] = fechaIso.substring(0, 10).split('-');
    return `${dia}/${mes}/${anio}`;
  }

  /** yyyy-MM-ddTHH:mm:ss  ->  dd/MM/yyyy HH:mm */
  formatearFechaHora(fechaIso: string): string {
    if (!fechaIso) {
      return '';
    }
    return `${this.formatearFecha(fechaIso)} ${fechaIso.substring(11, 16)}`;
  }


  cambiarTipo(): void {
    this.error = '';
    this.buscar();
  }

  buscar(): void {
    this.error = '';
    if (this.tipoReporte === 'CUADRE_CAJA') {
      this.buscarCuadre();
    } else {
      this.buscarMovimientos();
    }
  }

  private buscarCuadre(): void {
    if (!this.fecha) {
      this.error = 'Selecciona una fecha';
      return;
    }
    this.cargando = true;
    this.reporteService.obtenerCuadreCaja(this.fecha).subscribe({
      next: (data) => {
        this.cuadre = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el cuadre de caja';
        this.cargando = false;
      }
    });
  }

  private buscarMovimientos(): void {
    if (!this.desde || !this.hasta) {
      this.error = 'Selecciona las fechas "Desde" y "Hasta"';
      return;
    }
    if (this.desde > this.hasta) {
      this.error = 'La fecha "Desde" no puede ser mayor que "Hasta"';
      return;
    }
    this.cargando = true;
    this.reporteService.obtenerMovimientos(this.desde, this.hasta, this.idSucursal).subscribe({
      next: (data) => {
        this.movimientos = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el reporte de movimientos';
        this.cargando = false;
      }
    });
  }


  get puedeDescargar(): boolean {
    if (this.cargando) {
      return false;
    }
    return this.tipoReporte === 'CUADRE_CAJA' ? !!this.cuadre : !!this.movimientos;
  }


  private redondear(n: number): number {
    return Math.round(n * 100) / 100;
  }


  private configCuadre(cuadre: CuadreCaja): ConfigReporte {
    const metodos: string[] = [];
    cuadre.vendedores.forEach((v) =>
      v.totalesPorMetodo.forEach((m) => {
        if (!metodos.includes(m.nombreMetodoPago)) {
          metodos.push(m.nombreMetodoPago);
        }
      })
    );
    metodos.sort((a, b) => a.localeCompare(b));

    const nombreBonito = (n: string) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase();

    const encabezados = ['Vendedor', 'Total vendido', ...metodos.map(nombreBonito), '# Ventas'];
    const tipos: TipoColumna[] = ['texto', 'moneda', ...metodos.map((): TipoColumna => 'moneda'), 'centro'];

    const filas = cuadre.vendedores.map((v) => {
      const porMetodo = metodos.map(
        (nombre) => v.totalesPorMetodo.find((m) => m.nombreMetodoPago === nombre)?.total ?? 0
      );
      return [v.nombreUsuario, v.totalVendido, ...porMetodo, v.cantidadVentas] as (string | number)[];
    });

    const totales: (string | number)[] = ['TOTAL'];
    for (let i = 1; i < encabezados.length; i++) {
      totales.push(this.redondear(filas.reduce((acc, fila) => acc + Number(fila[i]), 0)));
    }

    const cobrado = this.redondear(
      totales.slice(2, totales.length - 1).reduce<number>((acc, n) => acc + Number(n), 0)
    );
    const pendiente = this.redondear(Number(totales[1]) - cobrado);

    return {
      titulo: 'Cuadre de caja',
      subtitulo: `Fecha: ${this.formatearFecha(cuadre.fecha)}`,
      archivo: `cuadre-caja-${cuadre.fecha}`,
      encabezados,
      tipos,
      filas,
      totales,
      pendiente,
      orientacion: 'portrait'
    };
  }


  private configMovimientos(rep: MovimientosReporte): ConfigReporte {
    let subtitulo = `Del ${this.formatearFecha(rep.desde)} al ${this.formatearFecha(rep.hasta)}`;
    if (this.idSucursal !== null) {
      const suc = this.sucursales.find((s) => s.idSucursal === this.idSucursal);
      if (suc) {
        subtitulo += `  |  Sucursal: ${suc.nombre}`;
      }
    }

    return {
      titulo: 'Movimientos de inventario',
      subtitulo,
      archivo: `movimientos-${rep.desde}_a_${rep.hasta}`,
      encabezados: ['Fecha', 'Tipo', 'Referencia', 'Producto', 'Sucursal', 'Entrada', 'Salida', 'Detalle'],
      tipos: ['texto', 'texto', 'texto', 'texto', 'texto', 'entero', 'entero', 'texto'],
      filas: rep.movimientos.map((m) => [
        this.formatearFechaHora(m.fecha),
        m.tipo,
        m.referencia,
        m.producto,
        m.sucursal,
        m.entrada,
        m.salida,
        m.descripcion ?? ''
      ]),
      totales: ['TOTAL', '', '', '', '', rep.totalEntradas, rep.totalSalidas, ''],
      orientacion: 'landscape'
    };
  }

  private configActual(): ConfigReporte | null {
    if (this.tipoReporte === 'CUADRE_CAJA') {
      return this.cuadre ? this.configCuadre(this.cuadre) : null;
    }
    return this.movimientos ? this.configMovimientos(this.movimientos) : null;
  }


  async descargarExcel(): Promise<void> {
    const config = this.configActual();
    if (!config) {
      return;
    }


    const modulo: any = await import('exceljs');
    const ExcelJS = modulo.default ?? modulo;

    const GRIS = 'FFD9D9D9';
    const GRIS_CLARO = 'FFF2F2F2';
    const FORMATO_Q = '"Q"#,##0.00';
    const FORMATO_ENTERO = '#,##0';
    const linea = { style: 'thin' as const, color: { argb: 'FFBFBFBF' } };
    const bordes = { top: linea, left: linea, bottom: linea, right: linea };
    const relleno = (argb: string) => ({ type: 'pattern' as const, pattern: 'solid' as const, fgColor: { argb } });

    const libro = new ExcelJS.Workbook();
    libro.creator = 'Dicosa';
    const hoja = libro.addWorksheet(config.titulo.substring(0, 31), {
      pageSetup: { orientation: config.orientacion, fitToPage: true, fitToWidth: 1, fitToHeight: 0 }
    });

    hoja.columns = config.encabezados.map((_, i) => {
      const tipo = config.tipos[i];
      const ancho = i === 0 ? (tipo === 'texto' ? 20 : 28) : tipo === 'texto' ? 24 : 15;
      return { width: ancho };
    });


    hoja.getCell('A1').value = config.titulo;
    hoja.getCell('A1').font = { size: 16, bold: true };
    hoja.getCell('A2').value = config.subtitulo;
    hoja.getCell('A2').font = { size: 11 };


    const FILA_ENCABEZADO = 4;
    config.encabezados.forEach((texto, i) => {
      const celda = hoja.getCell(FILA_ENCABEZADO, i + 1);
      celda.value = texto;
      celda.font = { bold: true };
      celda.fill = relleno(GRIS);
      celda.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      celda.border = bordes;
    });
    hoja.getRow(FILA_ENCABEZADO).height = 22;

    const escribirFila = (fila: number, valores: (string | number)[], esTotal: boolean) => {
      valores.forEach((valor, i) => {
        const celda = hoja.getCell(fila, i + 1);
        celda.value = valor;
        celda.border = bordes;
        const tipo = config.tipos[i];
        if (tipo === 'texto') {
          celda.alignment = { horizontal: 'left', vertical: 'middle' };
        } else if (tipo === 'centro') {
          celda.alignment = { horizontal: 'center', vertical: 'middle' };
        } else {
          celda.alignment = { horizontal: 'right', vertical: 'middle' };
          celda.numFmt = tipo === 'moneda' ? FORMATO_Q : FORMATO_ENTERO;
        }
        if (esTotal) {
          celda.font = { bold: true };
          celda.fill = relleno(GRIS_CLARO);
        }
      });
    };

    let fila = FILA_ENCABEZADO + 1;
    config.filas.forEach((valores) => {
      escribirFila(fila, valores, false);
      fila++;
    });
    escribirFila(fila, config.totales, true);

    if (config.pendiente !== undefined && config.pendiente > 0.009) {
      fila++;
      const etiqueta = hoja.getCell(fila, 1);
      etiqueta.value = 'Pendiente de cobro';
      etiqueta.font = { bold: true, color: { argb: 'FFC00000' } };
      const monto = hoja.getCell(fila, 2);
      monto.value = config.pendiente;
      monto.numFmt = FORMATO_Q;
      monto.font = { bold: true, color: { argb: 'FFC00000' } };
      monto.alignment = { horizontal: 'right' };
    }


    const buffer = await libro.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = `${config.archivo}.xlsx`;
    enlace.click();
    URL.revokeObjectURL(url);
  }


  private async cargarImagen(ruta: string): Promise<string> {
    const respuesta = await fetch(new URL(ruta, document.baseURI).href);
    const blob = await respuesta.blob();
    return new Promise<string>((resolve, reject) => {
      const lector = new FileReader();
      lector.onload = () => resolve(lector.result as string);
      lector.onerror = () => reject(lector.error);
      lector.readAsDataURL(blob);
    });
  }

  async descargarPdf(): Promise<void> {
    const config = this.configActual();
    if (!config) {
      return;
    }

    const { jsPDF } = await import('jspdf');
    const moduloTabla: any = await import('jspdf-autotable');
    const autoTable = moduloTabla.default ?? moduloTabla.autoTable;

    const q = (n: number) =>
      'Q' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const entero = (n: number) => n.toLocaleString('en-US');

    const doc = new jsPDF({ orientation: config.orientacion, unit: 'mm', format: 'a4' });
    const ancho = doc.internal.pageSize.getWidth();
    const alto = doc.internal.pageSize.getHeight();


    const logos = ['img/toys-wonderwood-logo.jpg', 'img/xepi-logo.jpg'];
    const TAM_LOGO = 22;
    let x = 14;
    for (const ruta of logos) {
      try {
        const imagen = await this.cargarImagen(ruta);
        doc.addImage(imagen, 'JPEG', x, 8, TAM_LOGO, TAM_LOGO);
      } catch {

      }
      x += TAM_LOGO + 4;
    }


    const xTexto = x + 4;
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(config.titulo, xTexto, 17);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(config.subtitulo, xTexto, 25);

    doc.setDrawColor(191, 191, 191);
    doc.line(14, 34, ancho - 14, 34);


    const formatearFila = (valores: (string | number)[]) =>
      valores.map((valor, i) => {
        const tipo = config.tipos[i];
        if (typeof valor === 'number') {
          return tipo === 'moneda' ? q(valor) : tipo === 'entero' ? entero(valor) : String(valor);
        }
        return valor;
      });

    const columnStyles: any = {};
    config.tipos.forEach((tipo, i) => {
      columnStyles[i] = { halign: tipo === 'texto' ? 'left' : tipo === 'centro' ? 'center' : 'right' };
    });

    autoTable(doc, {
      startY: 40,
      head: [config.encabezados],
      body: config.filas.map(formatearFila),
      foot: [formatearFila(config.totales)],
      showFoot: 'lastPage',
      theme: 'grid',
      styles: { fontSize: config.orientacion === 'landscape' ? 8.5 : 10, cellPadding: 2.5, lineColor: [191, 191, 191], textColor: [40, 40, 40] },
      headStyles: { fillColor: [217, 217, 217], textColor: [40, 40, 40], halign: 'center', fontStyle: 'bold' },
      footStyles: { fillColor: [242, 242, 242], textColor: [40, 40, 40], fontStyle: 'bold' },
      columnStyles
    });


    if (config.pendiente !== undefined && config.pendiente > 0.009) {
      const yFinal = (doc as any).lastAutoTable.finalY + 8;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(192, 0, 0);
      doc.text(`Pendiente de cobro: ${q(config.pendiente)}`, 14, yFinal);
    }


    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(130, 130, 130);
    doc.text(`Generado el ${new Date().toLocaleString('es-GT')}`, 14, alto - 10);

    doc.save(`${config.archivo}.pdf`);
  }
}
