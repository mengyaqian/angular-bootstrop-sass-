import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../../share/common.service';
import { NgbModal,NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {ScheduleDetailModalComponent} from '../schedule-detail-modal/schedule-detail-modal.component'

@Component({
  selector: 'app-schedule-list-modal',
  templateUrl: './schedule-list-modal.component.html',
  styleUrls: ['./schedule-list-modal.component.css']
})
export class ScheduleListModalComponent implements OnInit {
  private dataArr;
  private date;
  constructor(private _comm:CommonService,private modalService: NgbModal,private _activeModal:NgbActiveModal) { }

  ngOnInit() {
      this.dataArr=this._comm.scheduleListData.scheduleList;
      debugger
      this.date=this.dataArr[0].endValue.split(' ')[0]
      console.log(this.dataArr)
  }
  closeResult: string;
  itemClick(item){
    this._comm.scheduleData=item;
    this.modalService.open(ScheduleDetailModalComponent,{size:'lg'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

    close(){
      this._activeModal.close();
  }

}
