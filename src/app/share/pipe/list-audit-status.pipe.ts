import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listAuditStatus'
})
export class ListAuditStatusPipe implements PipeTransform {
  transform(value: number, args?: any): any {
	let text = '';
    switch(value){			
			case -1:
				text="已删除";
				break;
			case 0:
				text="未提交";
				break;
			case 1:
			case 2:
				text="审批中";
				break;
			case 3:
				text="审批通过";
				break;
			case 4:
				text="审批拒绝";
				break;
			case 5:
				text="待财务签收";
				break;
			case 7:
				text="财务审核终止";
				break;
			case 6:
			case 8:
				text="待财务结算";
				break;
			case 10:
				text="财务结算终止";
				break;
			case 9:
			case 11:
				text="待财务支付";
				break;
			case 12:
				text="财务已支付";
				break;
			case 13:
				text="财务已收款";
				break;
			case 14:
				text="已出行";
				break;
		}	
		return text;
  }

}

