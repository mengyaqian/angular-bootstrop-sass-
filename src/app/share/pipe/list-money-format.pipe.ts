import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listMoneyFormat'
})
export class ListMoneyFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let res = '';
    for(let v of value.listMoney){
       if(v.uuid == value.uuid || v.cashAdvanceBillId == value.uuid){
           res += ((v.code || v.currency)+':'+v.amount.toFixed(2))+' ';
       }
      }
    return res;
  }

}
