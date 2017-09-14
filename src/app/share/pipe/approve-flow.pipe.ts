import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'approveFlow'
})

export class ApproveFlowPipe implements PipeTransform {
  first:number=0;
  transform(value: any, args?: any): any {
    let v = value.conclusion;
    let type=value.type;
    let res='';
    switch(v){
      case 0:	
      if(this.first<2){
         res = (type ==1 ? 'shenghezhong-tubi':'审批中');
         this.first += 1;
      }else{
         res = (type ==1 ? 'noshenhe':'未到达');
      }
      break;
			case 1:		
        res = (type ==1 ? 'ogrin':'通过');
        break;
			case 2:
        res = (type ==1 ? 'jujue-tubb':'驳回');
        break;
			case 3:
        res = (type ==1 ? 'zhuanpi':'转批');	
        break;
			case 5:
        res = (type ==1 ? 'shenghezhong-tubi':'财务待签收');
        break;
			case 6:
         res = (type ==1 ? 'ogrin':'财务已签收');
         break;
			case 7:
        res = (type ==1 ? 'jujue-tubb':'财务审核终止');
        break;
			case 8:
       res = (type ==1 ? 'shenghezhong-tubi':'待财务结算');
       break;
			case 9:
        res = (type ==1 ? 'ogrin':'财务已结算');
        break;
			case 10:
       res = (type ==1 ? 'jujue-tubb':'财务结算终止');
       break;
			case 11:
        res = (type ==1 ? 'ogrin':'待财务支付');
        break;
			case 12:
        res = (type ==1 ? 'ogrin':'财务已支付');
        break;    
    }
    return res;
  }

}
