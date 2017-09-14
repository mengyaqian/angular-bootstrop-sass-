import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../share/common.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-notice-modal',
  templateUrl: './notice-modal.component.html',
  styleUrls: ['./notice-modal.component.css']
})
export class NoticeModalComponent implements OnInit {

  constructor(private _comm:CommonService,private _activeModal:NgbActiveModal) { }

  ngOnInit() {

  }
  close(){
      this._activeModal.close();
  }

  



}
