import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payType'
})
export class PayTypePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch(value){
			case 'PT01':
				return '现金支付';
			case 'PT02':
				return '网银支付';
			case 'PT03':
				return '银行转账';
			default:
				return '其他';
		}
  }

}
