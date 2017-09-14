import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import {Router } from '@angular/router'
@Component({
  selector: 'app-wait-deal',
  templateUrl: './wait-deal.component.html',
  styleUrls: ['./wait-deal.component.css']
})
export class WaitDealComponent implements OnInit {
   listData:any;
   pageCurrent:number=1;
   totalPage:number=0;
  constructor(private _http:HttpService,private router:Router) {}
  getList(){
    let requestData:any = {
      page:this.pageCurrent,
      pageSize:10,
      params:{
        type:'0'
      }
    }
    this._http.post('/group/work-message',requestData).subscribe(
      data=>{
          this.listData = data.message;
          this.totalPage =data.pageCount;
      }
    )
  }
  private pageChange(event:any):void {
    this.pageCurrent = event;
    this.getList();
  }
 linkHref(datas){
  if(datas.category == 9){//如果为日程（未确认）->日程管理（待确认日程）
   this.router.navigate(['/index/findSchedule']);
  }else{ //为单据->业务审批
   this.router.navigate(['/index/findSchedule']);
  }  
 }
  ngOnInit() {
    this.getList();
  }

}
