import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vacation-balance',
  templateUrl:'./vacation-balance.component.html',
  styleUrls: ['./vacation-balance.component.css']
})
export class VacationBalanceComponent implements OnInit {
  listData:any=[];
  tableCurreny:any=1;
  pageCurrent:number=1;
  totalPage:number=0;
  year:any='0';
  clearYear:any="";
  usedayInfo:any=[];
  yearList:any=[];

  constructor(private _http:HttpService,private modalService: NgbModal) { }
  
  //列表
  getList(){
    this._http.post('/holidaysRule/findMyHolidaysDetailsList',{yearRang:this.year}).subscribe(
      data=>{
          this.listData = data.data;
          this.totalPage =data.count;
      }
    )
  }
    //列表
    getListTwo(){
      this._http.post('/holidaysRule/findMyLeaveInLieuList',{clearDate:this.clearYear.replace(/-/g,'')}).subscribe(
        data=>{
            this.listData = data.data;
            this.totalPage =data.count;
        }
      )
    }
  //切换tab
  tabChange(i){
    this.tableCurreny =i;
    this.pageCurrent =1;
    this.year=0;
    if(i == 1){
      this.getList();
    }else{
      this.getListTwo();
    }
  }
  //查询
  search(){
    if(this.tableCurreny ==1){
      this.getList();
    }else{
      this.getListTwo();
    }
  }
    //查看使用天数
    useDay(useday,userId,ruleId,usedHours,leaveType){
      if(usedHours == 0){
        alert('暂无使用天数记录');
      }else{
         this._http.post('/holidaysRule/findHolidayUsedDetailByMyself',{leaveType:leaveType,ruleId:ruleId,userId:userId}).subscribe(
           data=>{
             this.usedayInfo=data.data;
             this.modalService.open(useday,{size:'lg'});
           }
         )
      }
   }
     //获取年份
    getYears(){
      let nowYear = new Date().getFullYear();
      this.yearList.push({'year':nowYear-1},{'year':nowYear},{'year':nowYear+1})
    }
      //分页
   pageChange(event){
    this.pageCurrent=event;
    if(this.tableCurreny==1){
      this.getList();
    }else{
      this.getListTwo();
    } 
  }
  dateSelected(data){
     this.clearYear = data;
  }

  ngOnInit() {
    this.getYears();
    this.getList();
  }

}
