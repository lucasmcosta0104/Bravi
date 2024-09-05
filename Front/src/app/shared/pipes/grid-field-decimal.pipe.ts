import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gridFieldDecimal',
  standalone: true,
})
export class GridFieldDecimalPipe implements PipeTransform {
  transform(value: any, isCurrency: boolean | undefined): any {
    return isCurrency
      ? new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value)
      : value;
  }
}
