import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-travel-book',
  templateUrl:'./travel-book.component.html',
  styleUrls: ['./travel-book.component.css']
})
export class TravelBookComponent implements OnInit {
 public barArr:any=[
    {
      name:'出差申请单',
      class:'businessApplyNav',
      href:'/index/travelBook/businessApply',
      check:true,
      child:false
    },
    {
      name:'我的订单',
      class:'myOrderNav',
      href:'/index/travelBook/myOrder',
      check:false,
      child:false
    },
    {
      name:'出行用车',
      class:'didiNav',
      href:'/index/travelBook/didi',
      check:false,
      child:false
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
