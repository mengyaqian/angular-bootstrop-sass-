import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import {UtilService}from '../../../../share/util.service';

@Component({
  selector: 'app-notice-drafts',
  templateUrl:'./notice-drafts.component.html',
  styleUrls: ['./notice-drafts.component.css']
})
export class NoticeDraftsComponent implements OnInit {
  private listData:any;
  private utilService:UtilService;
  constructor(public http:HttpService) { 
    this.utilService=new UtilService();
  }
  ngOnInit() {
    this.noticeDraftsList();
  }
  noticeDraftsList(){
    this.http.postForm('/notice/queryList',{'type':2}).subscribe(
        data=>{
            this.listData = data.content;
        }
      )
  }
//zuihou
}
