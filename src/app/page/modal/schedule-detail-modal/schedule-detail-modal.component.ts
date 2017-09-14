import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../../share/common.service';
import { NgbModal,NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../../share/http.service'
import {ScheduleModalComponent} from '../schedule-modal/schedule-modal.component'
import {ScheduleChanelModalComponent} from '../schedule-chanel-modal/schedule-chanel-modal.component'

@Component({
  selector: 'app-schedule-detail-modal',
  templateUrl: './schedule-detail-moda.component.html',
  styleUrls: ['./schedule-detail-moda.component.css']
})
export class ScheduleDetailModalComponent implements OnInit {
  private detailData:any;
  constructor(private _comm:CommonService,private modalService: NgbModal,private _http:HttpService,private _activeModal:NgbActiveModal) { }

  ngOnInit() {
    this.detailData=this._comm.scheduleData;
    this.detailData.sDate=this._comm.setDate(this.detailData.startDate.time,null,0);
    this.detailData.eDate=this._comm.setDate(this.detailData.endDate.time,null,0);
  }

  chanel(){
    /*this._http.post('',{}).subscribe(res=> {
    });*/
    this.modalService.open(ScheduleChanelModalComponent,{size:'sm'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
      });
  }
  closeResult: string;
  update(){
      this.modalService.open(ScheduleModalComponent,{size:'lg'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
      });
  }

  close(){
      this._activeModal.close();
  }

}
