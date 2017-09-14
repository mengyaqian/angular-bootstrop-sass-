import { Component, OnInit,Input,DoCheck } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../share/common.service'
import {ScheduleModalComponent} from '../modal/schedule-modal/schedule-modal.component'
import {ScheduleDetailModalComponent} from '../modal/schedule-detail-modal/schedule-detail-modal.component'
import {ScheduleListModalComponent} from '../modal/schedule-list-modal/schedule-list-modal.component'

@Component({
  selector: 'app-date',
  templateUrl:"./date.component.html",
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  @Input() scheduleStr:any;
  private scheduleData;

  constructor(private modalService: NgbModal,private _comm:CommonService) { }

  ngDoCheck(){
    if(this.scheduleStr ){
      if(JSON.stringify(this.scheduleData)!=JSON.stringify(this.scheduleStr)){
        this.scheduleData=this.scheduleStr;
      }
    }
  }


  ngOnInit() {
    
  }

  

  closeResult: string;
  open(item) {
      if(item.info.scheduleList.length==0 || !item.info){
            this._comm.selectDate=item.day;
            this.modalService.open(ScheduleModalComponent,{size:'lg'}).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
      }else if(item.info.scheduleList.length>1){
            this._comm.scheduleListData=item.info;
            this.modalService.open(ScheduleListModalComponent,{size:'sm'}).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
      }else{
            this._comm.scheduleData=item.info.scheduleList[0];
            this.modalService.open(ScheduleDetailModalComponent,{size:'lg'}).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
      }

  }

    private getDismissReason(reason: any): string {
      ModalDismissReasons.BACKDROP_CLICK
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

}
