import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DatevalidatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'datevalidate',
})
export class DatevalidatePipe implements PipeTransform {
    
  transform(val: any, args?) {
    let items;
    let todayDate = new Date().toDateString();
    if(val){
      if(args == 'past'){
        return items = val.filter((item) => {
          let con = new Date(item.startDate).toDateString();
          if(todayDate < con){
            return todayDate;
          }
        })
      }
      if(args == 'live'){
        return items = val.filter((item) => {
          let con = new Date(item.startDate).toDateString();
          if(todayDate == con){
            return todayDate;
          }
        })
      }
      if(args == 'upcoming'){
        return items = val.filter((item) => {
          let con = new Date(item.startDate).toDateString();
          if(todayDate > con){
            return todayDate;
          }
        })
      }
    }else{
      return val;
    }
  }
}
