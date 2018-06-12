import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the EventFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'peopleFilter',
})
export class PeopleFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(val: any, args?) {    
    let items;
    if(args!=undefined && args!= null && args!= ''){
      return items = val.filter((item) => {
        return (item.displayName.toLowerCase().indexOf(args.toLowerCase()) > -1);
      })
    }else{
      return val;
    }
    
  }
}
