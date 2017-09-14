import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';

@Component({
  selector: 'app-report-forms-outside',
  templateUrl: './report-forms-outside.component.html',
  styleUrls: ['./report-forms-outside.component.css']
})
export class ReportFormsOutsideComponent implements OnInit {
  showSwitch:boolean=true;
  dateTimeOption:any={
   format: 'yyyy-mm',
   startView:3,
   minView:3
  };
   searchData:any={
     searchtime:'',
     group:-2
   };
  //统计
  totaldata:string='';
  departList:any=[];
  totalList:any=[];
  departId:number=-1;
  emplayName:string='';

  pageCurrent:number=1;
  totalPage:number=0;
  
 


 constructor(private _http:HttpService) {}

 showTable(show){
     this.showSwitch=show;
     if(!show && this.totalList.length<=0){
       this.getSignList();
     }
 }
 //当前月
 initDay(){
   let t2 = new Date();
   let mon = t2.getMonth()+1;
   let mon2 =mon<10 ? '0'+mon : mon;
   this.searchData.searchtime=t2.getFullYear()+'-'+mon2;
   this.totaldata = t2.getFullYear()+'-'+mon2;
 }

//获取部门选项
getDepartant(){
  this._http.get('/leaveBillReport/queryAuthorizationDepartList','').subscribe(
    result=>{
      this.departList=result.message;
    }
  )
}


//外勤签到统计获取列表
getSignList(){
  let _data={
    userName:this.emplayName,
    date:this.totaldata+'-01',
    page:this.pageCurrent,
    pageSize:10,
    departmentId:this.departId
  }
  this._http.get('/statistics/findOutSideStatistic',_data).subscribe(
    result=>{
       this.totalList=result.findOutSideStatistic.data;
       this.totalPage=result.findOutSideStatistic.total;
    }
  )
}

//分页
private pageChange(event:any):void {
 this.pageCurrent = event;
 this.getSignList();
 
}
dateSelected(value){
 this.searchData.searchtime=value
}

 //下载
 downLoad(){
   location.href="http://10.0.0.14:8080/yodooweb/statistics/download?date="+this.totaldata+'-01'+"&siteId=-1&userName="+this.emplayName+"&type=3&departmentId="+this.departId;
  }

 ngOnInit() {
   this.initDay();
   this.getDepartant();
 }

}
