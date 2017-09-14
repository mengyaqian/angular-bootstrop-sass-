import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../share/http.service'
import {CommonService} from '../../../share/common.service'

@Component({
  selector: 'app-schedule-chanel-modal',
  templateUrl: './schedule-chanel-modal.component.html',
  styleUrls: ['./schedule-chanel-modal.component.css']
})
export class ScheduleChanelModalComponent implements OnInit {

  constructor(private _http:HttpService,private _comm:CommonService) { }

  ngOnInit() {
  }

  canelLast(){
    this._http.post('schedule/delectSchedule',{
      id:this._comm.scheduleData.id,
      startDate:this._comm.scheduleData.sDate
    }).subscribe(res=> {
    });
  }

  canel(){
    this._http.post('schedule/delectScheduleCurrent',{
      id:this._comm.scheduleData.id,
      startDate:this._comm.scheduleData.sDate
    }).subscribe(res=> {
    });
  }

}
