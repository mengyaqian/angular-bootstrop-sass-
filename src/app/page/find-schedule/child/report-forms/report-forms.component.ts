import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
@Component({
  selector: 'app-report-forms',
  templateUrl: './report-forms.component.html',
  styleUrls: ['./report-forms.component.css']
})
export class ReportFormsComponent implements OnInit {
   statis:any={
     text:'查看考勤详情',
     showDetial:false
   }
   showSwitch:boolean=true;
   dateTimeOption:any={
    format: 'yyyy-mm',
    startView:3,
    minView:3
   };
   totalLate:number=0;
   totalEarly:number=0;
   totalNoRecord:number=0;
   totalNoexit:number=0;
    selectGroup:string='8a80808e5c9a047c015c9b0d8e59001b';
    searchData:any={
      searchtime:'',
      group:this.selectGroup
    };
   //统计
   totaldata:string='';
   departList:any=[];
   totalList:any=[];
   totalDetialList:any=[];
   departId:number=-1;
   emplayName:string='';
   totalGroupId='8a80808e5c9a047c015c9b0d8e59001b';
   dayList:any=[];

   pageCurrent:number=1;
   totalPage:number=0;
   
  


  constructor(private _http:HttpService) {}
   
  statisSwitch(){
    if(this.statis.showDetial){
      this.statis.text='查看考勤详情';
      this.statis.showDetial=false;
    }else{
      this.statis.text='查看考勤统计';
      this.statis.showDetial=true;
    }
  }

  showTable(show){
      this.showSwitch=show;
      if(!show && this.totalList.length<=0){
        this.getSignList();
        this.getDetial();
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
 //接受子组件传来的数据
 getData(data){
   this.totalLate=data.count2;
   this.totalEarly=data.count4;
   this.totalNoRecord=data.count7;
   this.totalNoexit=data.count3;
 }
 //获取部门选项
 getDepartant(){
   this._http.get('/leaveBillReport/queryAuthorizationDepartList','').subscribe(
     result=>{
       this.departList=result.message;
     }
   )
 }
 //签到统计获取列表
 getSignList(){
   let _data={
     userName:this.emplayName,
     date:this.totaldata+'-01',
     siteId:this.totalGroupId,
     page:this.pageCurrent,
     pageSize:10,
     departmentId:this.departId
   }
   this._http.get('/statistics/findStatistics',_data).subscribe(
     result=>{
        this.totalList=result.statisticList.data;
        this.totalPage=result.statisticList.total;
     }
   )
 }
 //查看考勤详情
 getDetial(){
    let _data={
        userName:this.emplayName,
        date:this.totaldata+'-01',
        siteId:this.totalGroupId,
        page:this.pageCurrent,
        pageSize:10,
        departmentId:this.departId
      }
    this._http.get('/statistics/findStatisticsDetails',_data).subscribe(
      result=>{
           let res = {"result":true,"code":200,"myStatisticList":{"total":1,"data":[{"createOn":"2017-08-02 09:08:30","nickname":"孟倩","department":"saas事业部","title":"优读信息科技有限公司","data":"2017-08-02|6|09:08-19:05,2017-08-03|3|09:05-无,2017-08-04|6|09:05-18:58,2017-08-07|6|09:16-18:55,2017-08-08|6|09:04-18:52,2017-08-09|6|09:03-18:18,2017-08-10|3|08:58-无,2017-08-11|3|08:58-无"}]}};
           let datas = res.myStatisticList.data;
           let jsonData=[];
           this.totalPage=res.myStatisticList.total;
           let arrData=[];
          for(let item of datas){
            let _json = item.data.split(',');
            for(let v of _json){
              let _json2 = v.split('|');
              arrData.push(_json2);
            }
            jsonData.push({createOn:item.createOn,data:arrData == []?null:arrData,department:item.department,nickname:item.nickname,title:item.title})
          }
          this.totalDetialList=jsonData;
          
          console.log(this.totalDetialList);
      }
    )
 }
//分页
private pageChange(event:any):void {
  this.pageCurrent = event;
  if(this.statis.showDetial){
    this.getSignList();
  }else{
    this.getDetial();
  }
}
 dateSelected(value){
  this.searchData.searchtime=value
 }
 //根据日期算出周几(2017-05-12)
 weekends(d){
  let m = new Date(d).getDay();
  switch(m){
    case 0:
      return '周日';
    case 1:
      return '周一';
    case 2:
      return '周二';
    case 3:
      return '周三';
    case 4:
      return '周四';
    case 5:
      return '周五';
    case 6:
      return '周六';
    }
 }

 //获取一个月多少天(08)
  getCountDays(mon) {
    let mon2 = parseInt(mon);
    let curDate = new Date();
    curDate.setMonth(mon2);
    curDate.setDate(0);
    return curDate.getDate();
  }
  getDays(){
      let mon = this.totaldata.substring(5,7);
      let num = this.getCountDays(mon);
      let list=[];
      for(let i=1;i<=num;i++){
         let day = i<10 ? '0'+i :i;
         let week = this.weekends(this.totaldata+'-'+day);
         list.push({days:mon+'-'+day,week:week});
      }
      this.dayList = list;
      console.log(list);
  }
  //下载
  downLoad(){
    let _type = this.statis.showDetial ? 2:1;
    location.href="http://10.0.0.14:8080/yodooweb/statistics/download?date="+this.totaldata+'-01'+"&siteId="+this.totalGroupId+"&userName="+this.emplayName+"&type="+_type+'&departmentId='+this.departId;
  }

  ngOnInit() {
    this.initDay();
    this.getDepartant();
    this.getDays();
  }

}
