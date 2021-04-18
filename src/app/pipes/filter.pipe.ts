import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string) {
    // Create a empty array
    const resultArray = [];
    // if the value or filterString are empty, we will return back everyting
    if (value.length === 0 || filterString === '') {
      return value;
    }

    // This will filter each todo by tag and push the filtered todo items to the result Arr.
    for (let i = 0; i < value.length; i++) {
      for (let j = 0; j < value[i].itemTags.length; j++) {
        if (value[i].itemTags[j].name === filterString)  {
          resultArray.push(value[i])
        }
      }
    }
    // return the result array
    return resultArray;
  }

}
