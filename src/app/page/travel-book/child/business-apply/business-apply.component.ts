import { Component, OnInit,Input } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import { UtilService} from '../../../../share/util.service';
import {Router } from '@angular/router';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ListMoneyFormatPipe} from '../../../../share/pipe/list-money-format.pipe';
import {ListAuditStatusPipe} from '../../../../share/pipe/list-audit-status.pipe';
import {CreatBusinessComponent } from '../../../modal/creat-business/creat-business.component';
import {DetailBusinessComponent } from '../../../modal/detail-business/detail-business.component';
@Component({
  selector: 'app-business-apply',
  templateUrl: './business-apply.component.html',
  styleUrls: ['./business-apply.component.css']
})
export class BusinessApplyComponent implements OnInit {
  listData:any=[];
  listMoney:any=[];
 
  listStatus:any = [
    {status:0,name:'未提交'},
    {status:1,name:'审批中'},
    {status:3,name:'审批通过'},
    {status:4,name:'审批拒绝'},
    {status:5,name:'待财务签收'},
    {status:6,name:'待财务结算'},
    {status:7,name:'财务审核终止'},
    {status:9,name:'待财务支付'},
    {status:10,name:'财务结算终止'},
    {status:12,name:'财务已支付'},
    {status:14,name:'已出行'},
  ];
  status:any='-2';
  billNo:any ='';
  beginDate:any;
  endDate:any;
  pageCurrent:number=1;
  totalPage:number=0;

 constructor(private _http:HttpService,private router:Router,private _util:UtilService,private modalService: NgbModal) {}
 setInfo(e){
   this.status = e;
  }

 getList(){
   let requestData:any = {
     type:0,
     status:this.status,
     page:this.pageCurrent,
     orderNo:this.billNo,
     createTime:this.beginDate+' 00:00:00',
     endTime:this.endDate+' 23:59:59'
   }
   this._http.postForm('/bill/tripbill/listAll',requestData).subscribe(
     data=>{
         this.listData = data.message.all;
         this.listMoney = data.content;
         this.totalPage =data.message.count;
     }
   )
 }
 //日期初始化
 beginDateInput(){	
  let t2 = new Date().valueOf();
  let startTime = new Date(t2 - (1000*60*60*24*30));
  this.beginDate = this._util.getTimestr(startTime).substr(0,10).replace(/\//g,'-');
  this.endDate = this._util.getTimestr(new Date()).substr(0,10);
}
//新增出差申请
creatBill(type,uuid,status){//type:1新增，2编辑 ,uuid：-1为新增,status:0新增，0未提交 
  if(status == 0){//编辑或者新增
      let modalRef  = this.modalService.open(CreatBusinessComponent,{size:"lg"});
      modalRef.componentInstance.openType=type;
      modalRef.componentInstance.openuuid=uuid;
      modalRef.result.then((result) => {
        if(result == true){
          this.getList();
        }
    }, (reason) => {
      console.log(reason);
    });
  }else{//查看
    let modalRef  = this.modalService.open(DetailBusinessComponent,{size:"lg"});
    modalRef.componentInstance.openuuid=uuid;
    modalRef.componentInstance.ifApply=false;
  }

}

 private pageChange(event:any):void {
   this.pageCurrent = event;
   this.getList();
 }
 
 dateSelected(data,type){
   if(type=="begin"){
      this.beginDate = data;
   }else{
    this.endDate = data;
   }
 }
 ngOnInit() {
   this.beginDateInput();
   this.getList();
 }

}
