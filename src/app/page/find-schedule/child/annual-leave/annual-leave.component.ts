import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import { UtilService} from '../../../../share/util.service';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-annual-leave',
  templateUrl:'./annual-leave.component.html',
  styleUrls: ['./annual-leave.component.css']
})
export class AnnualLeaveComponent implements OnInit {
  listData:any=[]
  pageCurrent:number=1;
  totalPage:number=0;
  fkbNo:any='';
  userName:any='';
  yearRang:any=2017;
  holidayInfo:any={};
  infoChangeDays:number=0;//调整天数
  infoAfterrestDays:number=0;//调整后天数
  infoClearDate:any=0;//清空日期
  usedayInfo:any=[];
  constructor(private _http:HttpService,private _util:UtilService,private modalService: NgbModal) { }
  
  //列表
  getList(){
    let requestData:any = {
      mobile:this.fkbNo,
      orgId:711,
      page:this.pageCurrent,
      pageSize:10,
      userName:this.userName,
      yearRang:this.yearRang
    }
    this._http.post('/holidaysRule/findHolidaysDetailsList',requestData).subscribe(
      data=>{
          this.listData = data.data;
          this.totalPage =data.count;
      }
    )
  }
  //年假长度调整
  yearModify(yearholiday,mobile,orgId){
    this._http.post('/holidaysRule/findHolidaysDetails',{mobile:mobile,orgId:orgId}).subscribe(
       data=>{
         this.holidayInfo=data.data;
         this.infoAfterrestDays=data.data.restDays;
         this.infoClearDate=this._util.getTimestr(data.data.clearDate.time).substring(0,10);
         this.modalService.open(yearholiday,{size:"lg"});
       }
    )
   
  }
  //改变天数
  changeDay(num){
    if(num == 1){//加
       this.infoAfterrestDays += 1;
    }else{
      if( this.infoAfterrestDays ==0){
        alert('调整后天数不能小于0')
      }else{
        this.infoAfterrestDays -= 1;
      }
    }
  }
  //保存
  saveHoliday(d){
    this._http.post('/holidaysRule/updateHolidaysDetails',{mobile:this.holidayInfo.mobile,remark:this.holidayInfo.remark,restDays:this.infoAfterrestDays}).subscribe(
      data=>{
        d();
        this.getList();
      }
    )
  }
  //查看使用天数
  useDay(useday,userId,ruleId,usedHours){
     if(usedHours == 0){
       alert('暂无使用天数记录');
     }else{
        this._http.post('/holidaysRule/findHolidayUsedDetailByMyself',{leaveType:'LT003',ruleId:ruleId,userId:userId}).subscribe(
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
      this.yearRang='2017';
    }
    private dateTimeOption:any={
      format: 'yyyy',
      startView:4,
      minView:4,
      maxView:4
    }

  ngOnInit() {
    this.getList()
  }

}
