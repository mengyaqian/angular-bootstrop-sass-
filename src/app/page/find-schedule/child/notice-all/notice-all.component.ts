import {Component , OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import {UtilService}from '../../../../share/util.service';
import { NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notice-all',
  templateUrl:'./notice-all.component.html',
  styleUrls: ['./notice-all.component.css']
})
export class NoticeAllComponent implements OnInit {
  private listData:any;
  private details:any={};
  closeResult: string;
  private utilService:UtilService;
  constructor(public http:HttpService,private modalService: NgbModal) { 
    this.utilService=new UtilService();
  }
  ngOnInit() {
    this.noticeAllList();
  }
  noticeAllList(){
    this.http.postForm('/notice/queryList',{'type':3}).subscribe(
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
          this.modalService.open(notice);
      }
    )
  }
//zuihou
}
