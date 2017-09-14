import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import {UtilService}from '../../../../share/util.service';
import { NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notice-unread',
  templateUrl:'./notice-unread.component.html',
  styleUrls: ['./notice-unread.component.css']
})
export class NoticeUnreadComponent implements OnInit {
  private listData:any=[];
  private details:any={};
  closeResult: string;
  private utilService:UtilService;
  constructor(public http:HttpService,private modalService: NgbModal) { 
    this.utilService=new UtilService();
  }
  ngOnInit() {
    this.noticeUnreadList();
  }
  noticeUnreadList(){
    this.http.postForm('/notice/queryList',{'type':0}).subscribe(
        data=>{
            this.listData = data.content;
        }
      )
  }
  noticePopup(notice,id){
    this.http.postForm('/notice/findNoticeDetails',{'id':id}).subscribe(
      data=>{
        debugger
          this.details = data.content[0];
          this.noticeUnreadList();
          this.modalService.open(notice);
      }
    )
  }
//zuihou

}
