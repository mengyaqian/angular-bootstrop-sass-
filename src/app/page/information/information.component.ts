import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  public barArr:any=[
    {
      name:'待办',
      class:'waitDealtNav',
      href:'/index/information/waitDeal',
      check:true,
      child:false
    },
    {
      name:'提醒',
      class:'remindNav',
      href:'/index/information/remind',
      check:false,
      child:false
    },
    {
      name:'预警',
      class:'warningNav',
      href:'/index/information/warning',
      check:false,
      child:false
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
