import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import {UtilService}from '../../../../share/util.service';

@Component({
  selector: 'app-work-mentionst',
  templateUrl:'./work-mentions.component.html',
  styleUrls: ['./work-mentions.component.css']
})
export class WorkMentionsComponent implements OnInit {
  reportStatus:boolean=true;
  Contacts:boolean=true;
  searchnema:string;
  private listData:any;
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
    this.workreportList();
  }
  workreportList(){
    this.http.postForm('/report/submittedToMy',{'type':0}).subscribe(
        data=>{
            this.listData = data.content;
        }
      )
  }
   
  //提交人事件
  submitter(){
    this.Contacts=!this.Contacts;
  }
 
  //检索
  searchkey(){
    this.http.postForm('/group/searchUserOrGroup',{'keyword':this.searchnema,'type':7}).subscribe(
      data=>{
        debugger
          this.listData = data.userList;
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
  
  //select报告种类查询
  setInfo(){
    this.reportStatus=!this.reportStatus;
    this.http.postForm('/report/search',{'category':2,'userId':0,'type':this.student}).subscribe(
      data=>{
          this.listData = data.content;
      }
    )
  }

//zuihou

}
