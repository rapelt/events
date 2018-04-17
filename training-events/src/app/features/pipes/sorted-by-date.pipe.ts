import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'sortedByDate'
})
export class SortedByDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
     return null;
    }

    return value.sort((a, b) => {
      if (moment(a.date).isBefore(b.date)) {
        return -1;
      } else if (moment(a.date).isAfter(b.date)) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
