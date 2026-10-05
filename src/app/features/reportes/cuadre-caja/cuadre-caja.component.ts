import { Component, OnInit } from '@angular/core';
import { CuadreCaja } from '../../../core/models/cuadrecaja.model';
import { ReporteService } from '../../../core/services/Reporte.service';

interface TablaCuadre {
  encabezados: string[];
  filas: (string | number)[][];
  totales: (string | number)[];
  pendiente: number;
}

@Component({
  selector: 'app-cuadre-caja',
  standalone: false,
  templateUrl: './cuadre-caja.component.html',
  styleUrl: './cuadre-caja.component.css'
})
export class CuadreCajaComponent implements OnInit {

  tiposReporte = [
    { valor: 'CUADRE_CAJA', nombre: 'Cuadre de caja' }
  ];
  tipoReporte = 'CUADRE_CAJA';

  fecha: string = this.obtenerFechaHoy();
  cuadre: CuadreCaja | null = null;
  cargando = false;
  error = '';

  constructor(private reporteService: ReporteService) { }

  ngOnInit(): void {
    this.buscar();
  }

  obtenerFechaHoy(): string {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }

  buscar(): void {
    if (!this.fecha) {
      this.error = 'Selecciona una fecha';
      return;
    }
    this.cargando = true;
    this.error = '';
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


  private prepararTabla(cuadre: CuadreCaja): TablaCuadre {
    const redondear = (n: number) => Math.round(n * 100) / 100;

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

    const filas = cuadre.vendedores.map((v) => {
      const porMetodo = metodos.map(
        (nombre) => v.totalesPorMetodo.find((m) => m.nombreMetodoPago === nombre)?.total ?? 0
      );
      return [v.nombreUsuario, v.totalVendido, ...porMetodo, v.cantidadVentas] as (string | number)[];
    });

    const sumaColumna = (indice: number) =>
      redondear(filas.reduce((acc, fila) => acc + Number(fila[indice]), 0));

    const totales: (string | number)[] = ['TOTAL'];
    for (let i = 1; i < encabezados.length; i++) {
      totales.push(sumaColumna(i));
    }

    const cobrado = redondear(

      totales.slice(2, totales.length - 1).reduce<number>((acc, n) => acc + Number(n), 0)
    );
    const pendiente = redondear(Number(totales[1]) - cobrado);

    return { encabezados, filas, totales, pendiente };
  }

  private formatearFecha(fechaIso: string): string {
    const [anio, mes, dia] = fechaIso.split('-');
    return `${dia}/${mes}/${anio}`;
  }


  async descargarExcel(): Promise<void> {
    if (this.tipoReporte === 'CUADRE_CAJA') {
      await this.descargarCuadreCajaExcel();
    }
  }

  private async descargarCuadreCajaExcel(): Promise<void> {
    if (!this.cuadre) {
      return;
    }
    const cuadre = this.cuadre;
    const tabla = this.prepararTabla(cuadre);

    // La librería se carga solo al descargar.
    const modulo: any = await import('exceljs');
    const ExcelJS = modulo.default ?? modulo;

    const GRIS = 'FFD9D9D9';
    const GRIS_CLARO = 'FFF2F2F2';
    const FORMATO_Q = '"Q"#,##0.00';
    const linea = { style: 'thin' as const, color: { argb: 'FFBFBFBF' } };
    const bordes = { top: linea, left: linea, bottom: linea, right: linea };
    const relleno = (argb: string) => ({ type: 'pattern' as const, pattern: 'solid' as const, fgColor: { argb } });

    const libro = new ExcelJS.Workbook();
    libro.creator = 'Dicosa';
    const hoja = libro.addWorksheet('Cuadre de caja', {
      pageSetup: { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0 }
    });

    const totalColumnas = tabla.encabezados.length;
    hoja.columns = tabla.encabezados.map((_, i) => ({ width: i === 0 ? 28 : 17 }));

    // ---- Nombre del reporte y fecha ----
    hoja.getCell('A1').value = 'Cuadre de caja';
    hoja.getCell('A1').font = { size: 16, bold: true };
    hoja.getCell('A2').value = `Fecha: ${this.formatearFecha(cuadre.fecha)}`;
    hoja.getCell('A2').font = { size: 11 };

    // ---- Encabezados (gris) ----
    const FILA_ENCABEZADO = 4;
    tabla.encabezados.forEach((texto, i) => {
      const celda = hoja.getCell(FILA_ENCABEZADO, i + 1);
      celda.value = texto;
      celda.font = { bold: true };
      celda.fill = relleno(GRIS);
      celda.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      celda.border = bordes;
    });
    hoja.getRow(FILA_ENCABEZADO).height = 22;

    // ---- Filas y totales ----
    const escribirFila = (fila: number, valores: (string | number)[], esTotal: boolean) => {
      valores.forEach((valor, i) => {
        const celda = hoja.getCell(fila, i + 1);
        celda.value = valor;
        celda.border = bordes;
        const esUltima = i === totalColumnas - 1;
        if (i === 0) {
          celda.alignment = { horizontal: 'left', vertical: 'middle' };
        } else if (esUltima) {
          celda.alignment = { horizontal: 'center', vertical: 'middle' };
        } else {
          celda.alignment = { horizontal: 'right', vertical: 'middle' };
          celda.numFmt = FORMATO_Q;
        }
        if (esTotal) {
          celda.font = { bold: true };
          celda.fill = relleno(GRIS_CLARO);
        }
      });
    };

    let fila = FILA_ENCABEZADO + 1;
    tabla.filas.forEach((valores) => {
      escribirFila(fila, valores, false);
      fila++;
    });
    escribirFila(fila, tabla.totales, true);

    if (tabla.pendiente > 0.009) {
      fila++;
      const etiqueta = hoja.getCell(fila, 1);
      etiqueta.value = 'Pendiente de cobro';
      etiqueta.font = { bold: true, color: { argb: 'FFC00000' } };
      const monto = hoja.getCell(fila, 2);
      monto.value = tabla.pendiente;
      monto.numFmt = FORMATO_Q;
      monto.font = { bold: true, color: { argb: 'FFC00000' } };
      monto.alignment = { horizontal: 'right' };
    }

    // ---- Descarga ----
    const buffer = await libro.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = `cuadre-caja-${cuadre.fecha}.xlsx`;
    enlace.click();
    URL.revokeObjectURL(url);
  }


  async descargarPdf(): Promise<void> {
    if (this.tipoReporte === 'CUADRE_CAJA') {
      await this.descargarCuadreCajaPdf();
    }
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

  private async descargarCuadreCajaPdf(): Promise<void> {
    if (!this.cuadre) {
      return;
    }
    const cuadre = this.cuadre;
    const tabla = this.prepararTabla(cuadre);

    const { jsPDF } = await import('jspdf');
    const moduloTabla: any = await import('jspdf-autotable');
    const autoTable = moduloTabla.default ?? moduloTabla.autoTable;

    const q = (n: number) =>
      'Q' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const ancho = doc.internal.pageSize.getWidth();
    const alto = doc.internal.pageSize.getHeight();


    const logos = [
      { ruta: 'img/toys-wonderwood-logo.jpg' },
      { ruta: 'img/xepi-logo.jpg' }
    ];
    const TAM_LOGO = 22;
    let x = 14;
    for (const logo of logos) {
      try {
        const imagen = await this.cargarImagen(logo.ruta);
        doc.addImage(imagen, 'JPEG', x, 8, TAM_LOGO, TAM_LOGO);
      } catch {
        // Si un logo no carga, el PDF se genera igual.
      }
      x += TAM_LOGO + 4;
    }

    const xTexto = x + 4;
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Cuadre de caja', xTexto, 17);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`Fecha: ${this.formatearFecha(cuadre.fecha)}`, xTexto, 25);

    doc.setDrawColor(191, 191, 191);
    doc.line(14, 34, ancho - 14, 34);

    const ultimaColumna = tabla.encabezados.length - 1;
    const formatearFila = (valores: (string | number)[]) =>
      valores.map((valor, i) => (i === 0 || i === ultimaColumna ? String(valor) : q(Number(valor))));

    const columnStyles: any = { 0: { halign: 'left' } };
    for (let i = 1; i < ultimaColumna; i++) {
      columnStyles[i] = { halign: 'right' };
    }
    columnStyles[ultimaColumna] = { halign: 'center' };

    autoTable(doc, {
      startY: 40,
      head: [tabla.encabezados],
      body: tabla.filas.map(formatearFila),
      foot: [formatearFila(tabla.totales)],
      showFoot: 'lastPage',
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 3, lineColor: [191, 191, 191], textColor: [40, 40, 40] },
      headStyles: { fillColor: [217, 217, 217], textColor: [40, 40, 40], halign: 'center', fontStyle: 'bold' },
      footStyles: { fillColor: [242, 242, 242], textColor: [40, 40, 40], fontStyle: 'bold' },
      columnStyles
    });


    if (tabla.pendiente > 0.009) {
      const yFinal = (doc as any).lastAutoTable.finalY + 8;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(192, 0, 0);
      doc.text(`Pendiente de cobro: ${q(tabla.pendiente)}`, 14, yFinal);
    }


    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(130, 130, 130);
    doc.text(`Generado el ${new Date().toLocaleString('es-GT')}`, 14, alto - 10);

    doc.save(`cuadre-caja-${cuadre.fecha}.pdf`);
  }
}
