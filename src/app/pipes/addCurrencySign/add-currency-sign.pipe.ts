import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addCurrencySign',
  standalone: true
})
export class AddCurrencySignPipe implements PipeTransform {

  transform(value: string, sign: string = '$'): string {
    return `${Number(value).toFixed(2)}${sign}`;
  }

}
