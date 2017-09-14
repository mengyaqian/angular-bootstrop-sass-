import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import {UtilService}from '../../../../share/util.service';
import { NgbModal,NgbActiveModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notice-release',
  templateUrl:'./notice-release.component.html',
  styleUrls: ['./notice-release.component.css']
})
export class NoticeReleaseComponent implements OnInit {
  private listData:any;
   private details:any={};
  closeResult: string;
  private utilService:UtilService;
  constructor(public http:HttpService,private modalService: NgbModal) { 
    this.utilService=new UtilService();
  }
  ngOnInit() {
    this.noticeReleaseList();
  }
  noticeReleaseList(){
    this.http.postForm('/notice/queryList',{'type':1}).subscribe(
        data=>{
            this.listData = data.content;
        }
      )
  }
  noticePopup(notice,id){
    this.http.postForm('/notice/findNoticeDetails',{'id':id}).subscribe(
      data=>{
          this.details = data.content[0];
          this.modalService.open(notice);
      }
    )
  }
//zuihou

}
