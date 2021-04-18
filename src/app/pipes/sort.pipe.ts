import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], orderByKey: string): unknown {

    if (value.length === 0 || value[0][orderByKey] === undefined) {
      return value;
    }

    if (typeof value[0][orderByKey] === 'string') {
      return this.getSortedByString(value, orderByKey);
    }

    return value.sort((a, b) => 
      <any>new Date(a[orderByKey]) - <any>new Date(b[orderByKey])
    );

  }

  getSortedByString(value: any[], orderByKey:string) {
    return value.sort(function (a, b) {
        if(a[orderByKey].toLowerCase() < b[orderByKey].toLowerCase()) return -1;
        else if(a[orderByKey].toLowerCase() > b[orderByKey].toLowerCase()) return 1;
        return 0;
      });
  }

}