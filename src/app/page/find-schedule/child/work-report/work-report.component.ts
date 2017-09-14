import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import {UtilService}from '../../../../share/util.service';
import { NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-work-report',
  templateUrl:'./work-report.component.html',
  styleUrls: ['./work-report.component.css']
})
export class WorkReportComponent implements OnInit {
  private listData:any;
  private listpopup:any;
  private closeResult: string;
  item:string;
  filetype:string;
  students:any=[
                {'name':'全部报告','id':'0'},
                {'name':'我的日报','id':'1'},
                {'name':'我的周报','id':'2'},
                {'name':'我的月报','id':'3'}
              ];
  student:string='0';

  nextName:any;
  todayName:any; 
  nextnoe:any;
  todaytwo:any=[]; 
  private utilService:UtilService;
  constructor(public http:HttpService,private modalService: NgbModal) { 
    this.utilService=new UtilService();
  }
  //初始化
  ngOnInit() {
    this.workreportList();
  }
  //列表查询
  workreportList(){
    this.http.postForm('/report/findWorkreport',{'type':1}).subscribe(
        data=>{
            this.listData = data.content;
        }
      )
  }
    //报告类型
  worktext(text){ 
    switch(text) { 
      case 1: 
      return '我的日报';
      case 2: 
      return '我的周报';
      case 3: 
      return '我的月报';
      default:; 
    } 
  } 
  //select报告种类查询
  setInfo(){
    this.http.postForm('/report/search',{'category':0,'userId':0,'type':this.student}).subscribe(
      data=>{
          this.listData = data.content;
      }
    )
  }
  //报告弹框
  workPopup(work,id){
    this.http.postForm('/report/workDetails',{'type':0,'id':id}).subscribe(
      data=>{
          this.listpopup = data.result[0];
          debugger
          //今日总结
          this.nextName = this.listpopup;
          this.nextnoe=this.nextName.fileWork.nextName.split(",");
          /*if(this.nextnoe == ''){
            this.item ='无附件';
          }else{
            for(var i=0;i<this.nextnoe.length;i++){
              console.log(this.nextnoe[i]);
              this.filetype = this.nextnoe[i].substring(this.nextnoe[i].lastIndexOf(".")+1);
              console.log(this.filetype);
            }
          }*/
          //明日计划
          this.todayName = this.listpopup;
          this.todaytwo=this.todayName.fileWork.todayName.split(",");
          /*if(this.todaytwo == ''){
               this.item ='无附件';
          }else{
            for(var i=0;i<this.todaytwo.length;i++){
              console.log(this.todaytwo[i]);
              this.filetype = this.todaytwo[i].substring(this.todaytwo[i].lastIndexOf(".")+1);
              console.log(this.filetype);
            }
          }*/
          this.modalService.open(work);
      }
    )
    
  }
//zuihou
}
