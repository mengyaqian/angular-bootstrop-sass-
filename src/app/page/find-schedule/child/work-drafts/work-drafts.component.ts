import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import {UtilService}from '../../../../share/util.service';

@Component({
  selector: 'app-work-drafts',
  templateUrl:'./work-drafts.component.html',
  styleUrls: ['./work-drafts.component.css']
})
export class WorkDraftsComponent implements OnInit {
  private listData:any;
   reportStatus:boolean=true;
    students:any=[
                {'name':'全部报告','id':'0'},
                {'name':'我的日报','id':'1'},
                {'name':'我的周报','id':'2'},
                {'name':'我的月报','id':'3'}
              ];
  student:string='0';
  private utilService:UtilService;
  constructor(public http:HttpService) { 
    this.utilService=new UtilService();
  }

  ngOnInit() {
    this.workdraftstList();
  }
  workdraftstList(){
    this.http.postForm('/report/myDraftbox',{}).subscribe(
        data=>{
            this.listData = data.content;
        }
      )
  }
  //select报告种类查询
  setInfo(){
    this.reportStatus=!this.reportStatus;
    this.http.postForm('/report/search',{'category':3,'userId':0,'type':this.student}).subscribe(
      data=>{
          this.listData = data.content;
      }
    )
  }

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
//zuihou
}
