import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import {Router } from '@angular/router'
@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {
  listData:any;
  pageCurrent:number=1;
  totalPage:number=0;
 constructor(private _http:HttpService,private router:Router) {}
 getList(){
   let requestData:any = {
     page:this.pageCurrent,
     pageSize:10,
     params:{
       type:'2'
     }
   }
   this._http.post('/group/work-message',requestData).subscribe(
     data=>{
       if(data.statusCode =='200'){
         this.listData = data.message;
         this.totalPage =data.pageCount;
       }
     }
   )
 }
 private pageChange(event:any):void {
  this.pageCurrent = event;
  this.getList();
}
linkHref(datas){
   //现金预支页面
   this.router.navigate(['/index/findSchedule']); 
}
 ngOnInit() {
   this.getList();
 }


}
