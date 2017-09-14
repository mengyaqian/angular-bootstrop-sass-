import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../../share/http.service';
import {CommonService} from '../../../../share/common.service';
@Component({
  selector: 'app-my-date',
  templateUrl: './my-date.component.html',
  styleUrls: ['./my-date.component.css']
})
export class MyDateComponent implements OnInit {
  private scheduleData;
  private scheduleWeekData;
  private scheduleListData;
  private state:number=2;
  private year:string;
  private month:string;
  private day:string;
  private date:string;
  constructor(private _http:HttpService,private _comm:CommonService) { }

  ngOnInit() {
    let date=this._comm.getDate('date').split('-')
    this.year=date[0];
    this.month=date[1];
    this.day=date[2];
    this.date=this._comm.getDate('date');
    this.getSchedule(null)
  }

  getSchedule(type){
    //获取用户日程
    this._http.postForm('/schedule/findSchedule',{year:parseInt(this.year),month:parseInt(this.month),date:'',type:type}).subscribe(res=> {
        for(let i=0;i<res.dateInfoList.length;i++){
          for(let j=0;j<res.dataList.length;j++){
            if(res.dateInfoList[i].day==res.dataList[j].day){
              res.dateInfoList[i].info=res.dataList[j];
            }
          }
        }
        console.log(res)
        if(!type)
          this.scheduleData=res.dateInfoList;
        else if(type==1)
          this.scheduleWeekData=res.dateInfoList;
    });
  }

  getList(){
    this._http.postForm('/schedule/daySchedule',{newDate:parseInt(this.date),ids:null}).subscribe(res=> {
        this.scheduleListData=res;
    });
  }

  next(){
    if(parseInt(this.month)+1>12){
      this.month='1';
      this.year=(parseInt(this.year)+1).toString();
    }else
      this.month=(parseInt(this.month)+1).toString();
    if(this.state==1)
      this.getSchedule(null)
    else if(this.state==2)
      this.getSchedule(1)
  }

  last(){
    if(parseInt(this.month)-1 <=0){
      this.month='12';
      this.year=(parseInt(this.year)-1).toString();
    }else
      this.month=(parseInt(this.month)-1).toString();
    if(this.state==1)
        this.getSchedule(null)
    else if(this.state==2)
      this.getSchedule(1)
  }

  tabClick(state){
      this.state=state;
      if(state==1)
        this.getSchedule(null)
      else if(state==2)
        this.getSchedule(1)
      else if(state==3)
        this.getList();
  }

  dateSelected(date,type) {
    this.date=date;
    this.getList();
  }


}
