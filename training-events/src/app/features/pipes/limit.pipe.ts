import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return null;
    }

    return value.slice(0, args);
  }

}
