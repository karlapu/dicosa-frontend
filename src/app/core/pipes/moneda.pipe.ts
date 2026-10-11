import { LOCALE_ID, Inject, Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '@angular/common';
import { MonedaService } from '../services/moneda.service';


@Pipe({
  name: 'moneda',
  standalone: false,
  pure: false
})
export class MonedaPipe implements PipeTransform {

  constructor(
    private monedaService: MonedaService,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  transform(valor: number | string | null | undefined, formato: string = '1.2-2'): string {
    if (valor === null || valor === undefined || valor === '') {
      return '';
    }
    const numero = Number(valor);
    if (isNaN(numero)) {
      return '';
    }
    return `${this.monedaService.simbolo}${formatNumber(numero, this.locale, formato)}`;
  }
}
