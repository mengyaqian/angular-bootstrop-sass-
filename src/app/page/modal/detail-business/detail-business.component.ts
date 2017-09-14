import { Component, OnInit,Input } from '@angular/core';
import {NgbModal, NgbActiveModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpService} from '../../../share/http.service';

@Component({
  selector: 'app-detail-business',
  templateUrl: './detail-business.component.html',
  styleUrls: ['./detail-business.component.css']
})
export class DetailBusinessComponent implements OnInit {
  @Input() openuuid:any;
  @Input() ifApply:any=true;
  windowHeight:string='600px';
  table:number=0;
  billInfo:any={};
  cashAdvanceBillData:any={};//预支信息
  person:any={
    name:'',
    number:0
  };//同行人name number
  ifOrderList:any=[];
  show:any=[true,false,false,false,false];
  ifOpenapply:boolean=false;//是否开启开放式审批流
  constructor(private activeModal: NgbActiveModal,private _http:HttpService,private modalService: NgbModal) {}
  

  heightWin(){
    let _h= document.body.offsetHeight;
    this.windowHeight = (_h-100)+'px';
  }

  closeBill(){
    this.activeModal.close('Cross click')
  }
  //获取单据信息
   getInfo(){
       this._http.get('/bill/new/newGetBusinessTrip',{uuId:this.openuuid}).subscribe(
         result=>{
           this.billInfo=result.content[0];
           this.cashAdvanceBillData = result.content[0].cashAdvanceBill;
           this.toggerperson();
           this.ifCanOrder();
         }
       )
   }
   //table切换
   tableSwitch(i){
    this.table=i;
    this.show=[false,false,false,false,false];
    this.show[i]=true;
   }
   //同行人名字
   toggerperson(){
    let arrPerson =[];
    for(let v of this.billInfo.passengerBean){
      arrPerson.push(v.passengerName);
    }
    this.person = {name:arrPerson.join(','),number:this.billInfo.passengerBean.length} ;
    return this.person;
   }
   //是否满足去预定
   ifCanOrder(){
     let that = this;
     for(let v of this.billInfo.travelBookbeans){
       if(that.timeCompare(v.endTime)){//结束时间晚于当前时间
          if(that.billInfo.ifTrip == false){//未出行
             if(that.billInfo.cashAdvanceBillId != ""){//有预支：财务审批通过
               if (that.billInfo.billApprovalStatus == 12){
                 that.ifOrderList.push(true);
               }else{
                 that.ifOrderList.push(false);
               }
             }else{//没预支：业务审批通过
                if (that.billInfo.billApprovalStatus == 3){
                  that.ifOrderList.push(true);
                }else{
                  that.ifOrderList.push(false);
                }
             }
          }else{
            that.ifOrderList.push(false);
          }
       }else{
         that.ifOrderList.push(false);
       }
     }
   }

  //时间和当前时间比较
  timeCompare(endtime){
		var end = endtime.substring(0,11);
		end = end+'23:59:59';
		endtime = Date.parse(end.replace(/-/g,"/"));
		var enddate = new Date(endtime);
        var nowdate = new Date();   
        if(enddate < nowdate){
           return false;
        }else{
          return true;
        }
  }
  //是否开启了开放式审批流
  getOpenApprove(){
     this._http.get('/flow/find/orgFlowSettings',{type:-1}).subscribe(
       result=>{
        if(result.data.status ==1){
          this.ifOpenapply = true;
        }else{
          this.ifOpenapply = false;
        }
       }
     )
  }

  ngOnInit() {
    this.heightWin();
    this.getInfo();
    this.getOpenApprove();
  }

}
