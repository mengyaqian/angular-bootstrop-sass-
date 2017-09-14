import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-work-report',
  templateUrl: './add-work-report.component.html',
  styleUrls: ['./add-work-report.component.css']
})
export class AddWorkReportComponent implements OnInit {
  private workState:number=1;
  private picNum={
    day:'../../../../assets/images/1 (5).png',
    week:'../../../../assets/images/1 (11).png',
    month:'../../../../assets/images/1 (9).png'
  }
  constructor() { }

  ngOnInit() {
  }

  stateClick(state){
    this.workState=state;
    if(state==1){
      this.picNum={
        day:'../../../../assets/images/1 (5).png',
        week:'../../../../assets/images/1 (11).png',
        month:'../../../../assets/images/1 (9).png'
      }
    }else if(state==2){
      this.picNum={
        day:'../../../../assets/images/1 (6).png',
        week:'../../../../assets/images/1 (10).png',
        month:'../../../../assets/images/1 (9).png'
      }
    }else if(state==3){
      this.picNum={
        day:'../../../../assets/images/1 (6).png',
        week:'../../../../assets/images/1 (11).png',
        month:'../../../../assets/images/1 (8).png'
      }
    }
  }

}
