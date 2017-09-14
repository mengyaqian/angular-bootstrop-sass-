import { Component, OnInit ,Input} from '@angular/core';
import {Router } from '@angular/router'
import { NgbModal,NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import {NoticeModalComponent} from '../modal/notice-modal/notice-modal.component'
import {ScheduleModalComponent} from '../modal/schedule-modal/schedule-modal.component'
import {PersonModalComponent} from '../modal/person-modal/person-modal.component'

@Component({
  selector: 'nav-bar',
  templateUrl:'./bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  @Input() barArr:any;
  private barChild:any;

  constructor(private router:Router,private modalService: NgbModal,private _activeModal:NgbActiveModal) { }
  ngOnInit() {
    this.barChild=this.barArr[0].child;
  }

    add(barChild){
        let com;
        switch(barChild.button.type){
          case 'notice':
                this.modalService.open(NoticeModalComponent,{size:'lg'}).result.then((result) => {
                    console.log(result);
                }, (reason) => {
                  console.log(reason)
                });
          ;break;
          case 'schedule':
              this.modalService.open(ScheduleModalComponent,{size:'lg'}).result.then((result) => {
                  console.log(result);
              }, (reason) => {
                console.log(reason)
              });
          ;break;
          case 'work':
            debugger
                this.router.navigate(['/index/findSchedule/addWorkReport']);
          ;break;
        }
    }

  barClick(item){
    for(let i=0;i<this.barArr.length;i++){
        this.barArr[i].check=false;
    }
    item.check=true;
    if(item.child){
      this.barChild=item.child;
      this.router.navigate([this.barChild.list[0].href]);
    }else
      this.router.navigate([item.href]);
  }

  barChildClick(item){
    for(let i=0;i<this.barChild.list.length;i++){
        this.barChild.list[i].check=false;
    }
    if(item.id && item.id=="colleague_schedule"){
      if(item.arr && item.arr.length!=0){
        this.modalService.open(PersonModalComponent,{size:'sm'}).result.then((result) => {
            
        }, (reason) => {
            console.log(reason)
        });
      }else{
        this.router.navigate([item.href]);
      }
    }
    else{
        item.check=true;
        this.router.navigate([item.href]);
    }

  }

  


}
