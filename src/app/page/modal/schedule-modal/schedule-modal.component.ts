import { Component, OnInit } from '@angular/core';
import { NgbModal,NgbActiveModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../../share/common.service'
import {HttpService} from '../../../share/http.service'
import {PersonModalComponent} from '../person-modal/person-modal.component'

@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule-modal.component.html',
  styleUrls: ['./schedule-modal.component.css']
})
export class ScheduleModalComponent implements OnInit {
  private newSchedule={
      name:'',	//标题	String	Requied		   
      startdate:'',	//	开始日期	String	Requied		   
      enddate:'',	//	结束日期	String	Requied		   
      allday:0,	//	是否全天	Int	Requied	0 否 1 是	   
      repeat:0,	//	是否重复	Int	Requied	0 否 1 是	   
      repeattype:0,	//	重复开始方式	Int		1：每天，2：每周，3：每月 
      repeatHz:1,	//	开始方式(天、月)的频率	Int			   
      repeatvalue:'',	//	开始方式的频率(周)	String	
      endType:1,	//	选择重复时结束方式	Int		1次数2日期	   
      endvalue:this._comm.getDate('date'),	//	选择日期结束方式获取的值	String	
      endsvalue:'1',	//	选择次数结束方式获取的值			
      address:'',	//	参加地址	String			   
      content:'',	//	日程详情	String			   
      files:'',	//	上传附件				   
      joinUsers:'',	//	参与人员  值：userId	String			   
      seeUsers:'',	//	指定人员  值：userId,	String			   
      open:0,	//	保密程度 	Int	Requied	0：仅自己1：指定人可见  2：所有人	   
      warn:0,	//	提醒 	Int	Requied	0：不提醒  1：5分钟前  2:10分钟前 3：半小时前  4:1小时前 5:2小时前  6:1天前	   
      distinguish:''	//	区分是主页新建还是日程工作页新建
  }

  private newScheduleType={
    allday:false,
    joinUsers:[],
    seeUsers:[],
    repeatvalueArr:[
        {content:'周一',checked:false,value:1},
        {content:'周二',checked:false,value:2},
        {content:'周三',checked:false,value:3},
        {content:'周四',checked:false,value:4},
        {content:'周五',checked:false,value:5},
        {content:'周六',checked:false,value:6},
        {content:'周日',checked:false,value:7}
    ],
    fileArr:[]
  }
  private alertMassage:string;
  constructor(private _activeModal:NgbActiveModal,private modalService: NgbModal,private _comm:CommonService,private _http:HttpService) { }

  createSchedule(){
      if(this.newScheduleType.allday)
        this.newSchedule.allday=1;
      else
        this.newSchedule.allday=0;
      if(this.newSchedule.repeattype==0){
        this.newSchedule.repeat=0;
        this.newSchedule.repeattype=null;
      }
      let repeatArr=[];
      for(let i=0;i<this.newScheduleType.repeatvalueArr.length;i++){
        if(this.newScheduleType.repeatvalueArr[i].checked)
            repeatArr.push(this.newScheduleType.repeatvalueArr[i].value)
      }
      this.newSchedule.repeatvalue=repeatArr.join(',');
      let joinArr=[]
      for(let i=0;i<this.newScheduleType.joinUsers.length;i++){
          joinArr.push(this.newScheduleType.joinUsers[i].id)
      }
      this.newSchedule.joinUsers=joinArr.join(',');

      console.log(this.newSchedule)
        
  }

  fileChange(event){
    let file=event.srcElement.files[0];
    let fileBool=true;
    for(let i=0;i<this.newScheduleType.fileArr.length;i++){
        if(this.newScheduleType.fileArr[i].name==file.name){
            fileBool=false;
            break;
        }
    }
    debugger
    if(!fileBool){
        this.alertMassage='请勿上传重复的文件';
        return false;
    }
    this._http.post('/oss/policy',{
        bizCode:"schedule",
        fileName:file.name,
        orgId:this._comm.userInfo.orgId,
        size:file.size,
        userId:this._comm.userInfo.userId
    }).subscribe(res=> {
        res.data.name=file.name;
        res.data.size=file.size;
        this.newScheduleType.fileArr.push(res.data);
    });
  }

  removeFile(item){
    this._comm.arrRemove(this.newScheduleType.fileArr,item);
  }

  private dateTimeOption:any={
      format: 'yyyy-mm-dd hh:ii',
      pickTime: true
  }
  

  ngOnInit() {
      this.newSchedule.startdate=this._comm.selectDate+' 00:00';
      this.newSchedule.enddate=this._comm.selectDate+' 00:00';
  }

  close(){
      this._activeModal.close();
  }
  closeResult: string;
  personShow(type) {
      this.modalService.open(PersonModalComponent,{size:'sm'}).result.then((result) => {
          console.log(result);
          if(!result)
            return false;
          if(type=='joinUsers')
            this.newScheduleType.joinUsers=result;
          if(type=='open')
            this.newScheduleType.seeUsers=result;
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          console.log(reason)
      });
  }

    openChange(){
        if(this.newSchedule.open==1)
            this.personShow('open');
    }

}
