import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'colorfilter',
})
export class ColorPipe implements PipeTransform {
  transform(items: any[], color: string) {
    let arrayitems = items;
    if (
      !color ||
      typeof color === 'undefined' ||
      color === '' ||
      color === null
    ) {
      return arrayitems;
    }
    return arrayitems.filter(
      (x) => x.color.toLowerCase().indexOf(color.toLowerCase()) != -1
    );
  }
}
