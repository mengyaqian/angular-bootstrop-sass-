import { Component, OnInit,AfterViewInit,OnDestroy,ViewChild } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


import {HttpService} from '../../share/http.service';
import {CommonService} from '../../share/common.service'
    

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit,OnDestroy {

  private timeObj:any={
    hour:0,
    minute:0,
    second:0
  };
  private date:string;
  private day:string;
  private lastDate:string;
  private mybillDate:string;

  private timer;
  private message:any={
    msgOne:{},
    msgTwo:{},
    msgThree:{}
  };
  private scheduleData:any;
  
  private expenditureState:number=1;
  private beginTime:boolean;
  private endTime:boolean;
  

  private doughnutChartLabels: string[] ;
  private doughnutChartData: number[] = [];
  private doughnutChartType: string = 'doughnut';



  constructor(private _http:HttpService,private _comm:CommonService) { 
  }

  ngOnInit() {
      let time=this._comm.getDate('hour');
      this.timeObj.hour=time.split(':')[0];
      this.timeObj.minute=time.split(':')[1];
      this.timeObj.second=parseInt(time.split(':')[2]);

      this.date=this._comm.getDate('date');
      this.mybillDate=this._comm.getDate('date');
      this.lastDate=this._comm.setDate(this.date,'month',-1);
      this.day=this._comm.getDate('day');

      this.getSchedule(this.date.split('-')[0],this.date.split('-')[1])
      
      this.getMessage();
      this.getFindBillBook('doug');
      this.getFindBillBook('line');
  }

  ngAfterViewInit(){
      this.timer=setInterval(()=>{
        this.timeObj.second++;
        if(this.timeObj.second==60){
          this.timeObj.second=0;
          this.timeObj.minute++;
        }
        if(this.timeObj.minute==60){
          this.timeObj.minute=0;
          this.timeObj.second++;
        }
      },1000)
  }

  ngOnDestroy(){
    if(this.timer)
      clearInterval(this.timer)
  }



  getSchedule(year,month){
    //获取用户日程
    this._http.postForm('/web/getschdule',{year:parseInt(year),month:parseInt(month),date:''}).subscribe(res=> {
        for(let i=0;i<res.dateInfoList.length;i++){
          for(let j=0;j<res.dataList.length;j++){
            if(res.dateInfoList[i].day==res.dataList[j].day){
              res.dateInfoList[i].info=res.dataList[j];
            }
          }
        }
        console.log(res.dateInfoList)
        this.scheduleData=res.dateInfoList;
    });
  }

  getMessage(){
    //首页查询工作消息
    this._http.postForm('/group/home-message',{}).subscribe(res=> {
        this.message=res;
    });
  }

  dateClick(type){
    if(type=='firstDate-start'){
      this.beginTime=true;
      this.endTime=false;
    }else{
      this.beginTime=false;
      this.endTime=true;
    }
    event.stopPropagation();
  }

  dateSelected(date,type) {
    if(type=='lastDate'){
      this.lastDate=date;
      this.getFindBillBook('doug');
    }else if(type='date'){
      this.date=date;
      this.getFindBillBook('doug');
    }else{
      this.mybillDate=date;
      this.getFindBillBook('line');
    }
  }

  getFindBillBook(type){
    let option;
    if(type=='doug')
      option={startDate:this.lastDate,endDate:this.date}
    else if(type=='line')
      option={startDate:this.mybillDate,endDate:0}

    //获取用户开支流水
    this._http.postForm('/bill/findBillBook',option).subscribe(res=> {
      if(type=='doug'){
        this.createDoug(res);
      }else if(type=='line'){
        this.createLine(res);
      }
        
    });
      
  }

  createDoug(res){
    let lebalArr=[];
    let dataArr=[];
    for(let i=0;i<res.message.length;i++){
        lebalArr.push(res.message[i].costProjectName);
        dataArr.push(res.message[i].amount);
    }
    this.doughnutChartData=dataArr;
    this.doughnutChartLabels=lebalArr;
  }

  createLine(res){
    let map=[{data: [],label:'金额曲线图'}]
    let mapObj=[];
    for(let key in res.message){
      mapObj.push(key)
      map[0].data.push(res.message[key])
    }
    this.lineChartLabels=mapObj;
    this.lineChartData=map;
    console.log(map)
  }



    public lineChartData: Array<any> = [
    ];
    public lineChartLabels: Array<any> = [];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';








}
