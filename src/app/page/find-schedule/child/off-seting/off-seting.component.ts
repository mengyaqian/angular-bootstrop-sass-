import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import { UtilService} from '../../../../share/util.service';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-off-seting',
  templateUrl:'./off-seting.component.html',
  styleUrls: ['./off-seting.component.css']
})
export class OffSetingComponent implements OnInit {
  listData:any=[];
  pageCurrent:number=1;
  totalPage:number=0;
  fkbNo:any='';
  userName:any='';
  yearRang:any='';
  usedayInfo:any=[];
  constructor(private _http:HttpService,private _util:UtilService,private modalService: NgbModal) { }
  
  //列表
  getList(){
    let requestData:any = {
      mobile:this.fkbNo,
      clearDate:this.yearRang.replace(/-/g,''),
      page:this.pageCurrent,
      pageSize:10,
      userName:this.userName
    }
    this._http.post('/holidaysRule/findLeaveInLieuList',requestData).subscribe(
      data=>{
          this.listData = data.data;
          this.totalPage =data.count;
      }
    )
  }
    //查看使用天数
    useDay(useday,userId,ruleId,usedHours){
      if(usedHours == 0){
        alert('暂无使用天数记录');
      }else{
         this._http.post('/holidaysRule/findHolidayUsedDetailByMyself',{leaveType:'LT004',ruleId:ruleId,userId:userId}).subscribe(
           data=>{
             this.usedayInfo=data.data;
             this.modalService.open(useday,{size:'lg'});
           }
         )
      }
   }
   //分页
   pageChange(event){
     this.pageCurrent=event;
     this.getList();
   }
   //查询
   serach(){
     this.pageCurrent=1;
     this.getList();
   }
   //重置
   reset(){
     this.userName='';
     this.fkbNo='';
     this.yearRang='';
   }
   dateSelected(data){
    this.yearRang = data
  }
  ngOnInit() {
    this.getList();
  }

}
