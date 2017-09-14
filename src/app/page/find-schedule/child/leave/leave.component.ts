import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import { UtilService} from '../../../../share/util.service';

@Component({
  selector: 'app-leave',
  templateUrl:'./leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  listData:any=[];
  pageCurrent:number=1;
  totalPage:number=0;
  startdate:any='';
  enddate:any='';
  departId:number=-1;
  username:string='';
  departList:any=[];
  isShow:boolean=false;//是否显示部门下拉等
  tableCurreny:number=1; //当且tab 加班汇总1，加班明细2
  constructor(private _http:HttpService,private _util:UtilService) { }
  //获取部门列表
  getDepartList(){
    this._http.get('/leaveBillReport/queryAuthorizationDepartList','').subscribe(
      data=>{
        let res =data.message;
        if(res.length >0){//有管辖的部门
          let arr = [];
          this.isShow = true;
          for(let i of res){
              arr.push({departId:i.id,name:i.name});
          }
          this.departList = arr;
        }else{
          this.username =  JSON.parse(sessionStorage.getItem('userInfo')).name;//当前登陆用户的用户名
          this.departId =  JSON.parse(sessionStorage.getItem('userInfo')).departId;//当前登陆用户的用户名
          this.isShow = false;
        }
        this.getList();
      }
    )
  }
 //加班汇总统计
  getList(){
    let requestData:any = {
      page:this.pageCurrent,
      pageSize:10,
      startdate:this.startdate,
      enddate:this.enddate,
      departId:this.departId,
      username:this.username,
      type:1
    }
    this._http.postForm('/leaveBillReport/queryLeaveBIllReport',requestData).subscribe(
      data=>{
          this.listData = data.message;
          this.totalPage =data.pageCount;
      }
    )
  }  
   //加班明细统计
   getListTwo(){
    let requestData:any = {
      page:this.pageCurrent,
      pageSize:10,
      startdate:this.startdate,
      enddate:this.enddate,
      departId:this.departId,
      username:this.username,
      type:1
    }
    this._http.postForm('/leaveBillReport/queryLeaveBIllDetailReport',requestData).subscribe(
      data=>{
          this.listData = data.message;
          this.totalPage =data.pageCount;
      }
    )
  } 
  //切换tab
  tabChange(i){
    this.tableCurreny =i;
    this.pageCurrent =1;
    this.reset();
    if(i == 1){
      this.getList();
    }else{
      this.getListTwo();
    }
  }
  //点击姓名  查改该人的详情
  seeDetail(name,departid,departmentName){
    this.tableCurreny=2;
    this.departId = departid;
    this.username = name;
    this.getListTwo();
 }
  //导出
  importCon(){
    if(this.listData.length<=0){
      alert('暂无可导出数据');
      return false;
    }
    if(this.tableCurreny == 1){//请假汇总
        let openUrl = 'http://10.0.0.14:8080/yodooweb/leaveBillReport/export?startdate='+this.startdate+'&enddate='+this.enddate+'&departId='+this.departId+'&username='+this.username+'&type=1'; 
        window.location.href=openUrl;
      }else{//请假明细
        let openUrl = 'http://10.0.0.14:8080/yodooweb/leaveBillReport/exportDetail?startdate='+this.startdate+'&enddate='+this.enddate+'&departId='+this.departId+'&username='+this.username+'&type=1'; 
        window.location.href=openUrl;
      }
  }
  //重置
  reset(){
    this.username='';
    this.departId=-1;
    this.beginDateInput()
  }
   //日期初始化
 beginDateInput(){	
  let t2 = new Date().valueOf();
  let startTime = new Date(t2 - (1000*60*60*24*30));
  this.startdate = this._util.getTimestr(startTime).substr(0,10).replace(/\//g,'-');
  this.enddate = this._util.getTimestr(new Date()).substr(0,10);
}
  dateSelected(data,type){
    if(type=='begin'){
       this.startdate = data;
    }else{
     this.enddate = data;
    }
  }

  ngOnInit() {
    this.beginDateInput();
    this.getDepartList();
  }

}
