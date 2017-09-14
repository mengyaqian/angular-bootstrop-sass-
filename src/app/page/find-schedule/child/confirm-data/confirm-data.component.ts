import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import {UtilService}from '../../../../share/util.service';
@Component({
  selector: 'app-confirm-data',
  templateUrl:'./confirm-data.component.html',
  styleUrls: ['./confirm-data.component.css']
})
export class ConfirmDataComponent implements OnInit {
  private listData:any;
  private listimg:any;
  private utilService:UtilService;
  constructor(public http:HttpService) { 
    this.utilService=new UtilService();
  }
  ngOnInit() {
    this.noticeAllList();
  }
  noticeAllList(){
    this.http.postForm('/schedule/toBeConfirmedSchedule',{}).subscribe(
        data=>{
          this.listData = data.content;
        }
      )
  }
  confirmimg(img){ 
    switch(img) { 
      case 1: 
      return '../../../../../../assets/images/dsadhushosia (16).png';
      case 2: 
      return '../../../../../../assets/images/dsadhushosia (19).png';
      default:; 
    } 
  } 
  confirm(s,i){
    this.http.postForm('/schedule/refuseOrConfirm',{status:s,id:i}).subscribe(
        data=>{
          this.listData = data.content;
          this.noticeAllList();
        }
    )
  }

}
