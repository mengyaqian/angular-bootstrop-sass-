import { Component, OnInit,Output,EventEmitter,Input,DoCheck } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import { NgbModal,NgbActiveModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-data',
  templateUrl: './sign-data.component.html',
  styleUrls: ['./sign-data.component.css']
})
export class SignDataComponent implements OnInit {
   @Output() childEvent=new EventEmitter(); //发送给父组件检索出来的数据
   @Input()  giveChildSearch;//接受来自父组件的检索条件
   comperSearch:any={
    searchtime:'',
    group:''
   };
 
   currenyYear:number=new Date().getFullYear();
   currenyMonth:number=new Date().getMonth()+1;
   dateInfoList:any=[];
   dateInfoYMD:any=[];
   dataSign:any={};
   isClick:boolean=false;
   outSideData:any=[];
   

  constructor(private _http:HttpService,private modalService: NgbModal) {}
  ngDoCheck(){
    if(this.comperSearch.searchtime != this.giveChildSearch.searchtime || this.comperSearch.group != this.giveChildSearch.group){
      this.comperSearch.searchtime=this.giveChildSearch.searchtime;
      this.comperSearch.group=this.giveChildSearch.group;
      this.currenyYear =this.giveChildSearch.searchtime.substring(0,4);
      this.currenyMonth =this.giveChildSearch.searchtime.substring(5,7);
      this.getList();
    }
  }
    //上月，下月
  changeMon(type){
    if(type=='next'){//下个月
      if(this.isClick){
        if(this.currenyMonth == 12){
          this.currenyMonth = 1;
          this.currenyYear +=1;
        }else{
         this.currenyMonth +=1;
        }
        this.getList();
        if(this.currenyMonth == new Date().getMonth()+1){
          this.isClick=false;
        }
      } 
    }else{//上个月
      if(this.currenyMonth == 1){
        this.currenyMonth = 12;
        this.currenyYear -=1;
      }else{
       this.currenyMonth -=1;
      }
      this.isClick=true;
      this.getList();
    }
  }
  //打卡签到获取当前月数据
  getList(){
     let _data={
      year:this.currenyYear,
      month:this.currenyMonth,
      date:'',
      ids:'',
      type:''
     };
     this._http.postForm('/schedule/findSchedule',_data).subscribe(
       result=>{
         this.dateInfoList =result.dateInfoList;
         let arr =[];         
         for(let item of result.dateInfoList){
            arr.push(item.day);
         }
         this.dateInfoYMD=arr;
         if(this.comperSearch.group !=-2){
          this.getSign();
         }else{
          this.getSignOut();
         }
         
       }
     )
  }
  //外勤签到数据
  getSignOut(){
    let that = this;
    let _data = that.currenyYear+'-'+that.currenyMonth+'-'+new Date().getDay();
    this._http.get('/statistics/findMyOutSideStatistic',{date:_data}).subscribe(
      result=>{
        //let res = {"result":true,"code":200,"findMyOutSideStatistic":[{"createOn":"2017-08-03 20:15:23.0","count":1},{"createOn":"2017-08-10 20:32:48.0","count":1},{"createOn":"2017-08-11 23:11:31.0","count":1}]};
        let myStatisticList=result.findMyOutSideStatistic;
        myStatisticList.forEach(function (item,i) {
          let creat = item.createOn.substring(0,10);
          let index = that.dateInfoYMD.indexOf(creat);//位置
          if(index>=0){
            that.dateInfoList[index].haveSignOut=true;
            that.dateInfoList[index].signOutInfo=myStatisticList[i];
          }
        });
      }
    )
  }

  //获取签到记录
  getSign(){
    let that = this;
    let _data={
      date:that.currenyYear+'-'+that.currenyMonth+'-'+new Date().getDate(),
      siteId:this.giveChildSearch.group   //班组id
    }
    that._http.get('/statistics/findMyStatistics',_data).subscribe(
      result=>{
        that.dataSign = result;
        that.childEvent.emit(result);
        let myStatisticList=result.myStatisticList;
         /* let myStatisticList=[
            {
                "createOn": "2017-08-02 09:08:30.0",
                "updateOn": "2017-08-02 19:05:37.0",
                "type": 6
            },
            {
                "createOn": "2017-08-03 09:05:56.0",
                "updateOn": "无",
                "type": 3
            },
            {
                "createOn": "2017-08-04 09:05:16.0",
                "updateOn": "2017-08-04 18:58:04.0",
                "type": 6
            },
            {
                "createOn": "2017-08-07 09:16:25.0",
                "updateOn": "2017-08-07 18:55:20.0",
                "type": 6
            },
            {
                "createOn": "2017-08-08 09:04:10.0",
                "updateOn": "2017-08-08 18:52:08.0",
                "type": 6
            },
            {
                "createOn": "2017-08-09 09:03:20.0",
                "updateOn": "2017-08-09 18:18:33.0",
                "type": 6
            },
            {
                "createOn": "2017-08-10 08:58:09.0",
                "updateOn": "无",
                "type": 3
            }
          ];*/
          myStatisticList.forEach(function (item,i) {
            let creat = item.createOn.substring(0,10);
            let index = that.dateInfoYMD.indexOf(creat);//位置
            if(index>=0){
              that.dateInfoList[index].haveSign=true;
              that.dateInfoList[index].signInfo=myStatisticList[i];
            }
          });
      }
    )
  }

  signOutDatial(d,content){
     let _date = d.substring(0,11);
     this._http.get('/statistics/findSigninsOutSidePicture',{date:_date}).subscribe(
       result=>{
         this.outSideData=result.outSidePictures;
         this.modalService.open(content)
       }
     )
  }

  ngOnInit() {
    this.getList();
  }

}
