import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
//import {UtilService}from '../../../../share/util.service';
@Component({
  selector: 'app-work-subtome',
  templateUrl: './work-subtome.component.html',
  styleUrls: ['./work-subtome.component.css']
})
export class WorkSubtomeComponent implements OnInit {
  private listData:any=[];
  students:any=[
                {'name':'全部报告','id':'0'},
                {'name':'我的日报','id':'1'},
                {'name':'我的周报','id':'2'},
                {'name':'我的月报','id':'3'}
              ];
  student:string='0';
  reportStatus:boolean=true;
  Contacts:boolean=true;
  searchnema:string;
  //private utilService:UtilService;

  constructor(public http:HttpService) { 
    //this.utilService=new UtilService();
  }
  //查询列表
  worktomeList(){
    this.http.postForm('/report/submittedToMy',{'type':1}).subscribe(
        data=>{
            this.listData = data.content;
        }
      )
  }
  //提交人事件
  submitter(){
    this.Contacts=!this.Contacts;
  }
  //检索查询
  searchkey(){
    this.http.postForm('/group/searchUserOrGroup',{'keyword':this.searchnema,'type':6}).subscribe(
      data=>{
          this.listData = data.userList;
      }
    )
  }
  //select报告种类查询
  setInfo(){
    this.reportStatus=!this.reportStatus;
    this.http.postForm('/report/search',{'category':1,'userId':0,'type':this.student}).subscribe(
      data=>{
          this.listData = data.content;
      }
    )
  }
  nameseach(n){
    this.http.postForm('/report/search',{'category':2,'userId':n,'type':0}).subscribe(
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
  ngOnInit() {
    this.worktomeList();
  }
//最后
}
