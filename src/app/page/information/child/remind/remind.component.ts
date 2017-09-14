import { Component, OnInit} from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import {Router } from '@angular/router';
import {ImageSrcPipe} from './image-src.pipe'
@Component({
  selector: 'app-remind',
  templateUrl: './remind.component.html',
  styleUrls: ['./remind.component.css']
})
export class RemindComponent implements OnInit {
  listData:any;
  pageCurrent:number=1;
  totalPage:number=0;
 constructor(private _http:HttpService,private router:Router) {}
 getList(){
  let requestData:any = {
    page:this.pageCurrent,
    pageSize:10,
    params:{
      type:'1'
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
  let requestData:any = {
    entityIndex:datas.index,
    category:datas.category,
    receiverId:datas.receiverId
  }
  //先删除再跳转
  this._http.postForm('/schedule/deleteMessage',requestData).subscribe(
    data=>{
      let _subtype = datas.subType;
      let _category = datas.category;
      if(_subtype == 10){ //知会我的
        this.router.navigate(['/index/findSchedule']);
      }else{ 
        let urls;
        switch(_category){ 
          case 0 :urls = '/index/findSchedule'; break;//出差申请单
          case 1 :urls = '/index/findSchedule';break;//现金预支
          case 2 :urls = '/index/findSchedule';break;//预支还款
          case 3 :urls = '/index/findSchedule';break;//出差费用报销单
          case 4 :urls = '/index/findSchedule';break;//日常报销单
          case 5 :urls = '/index/findSchedule';break;//日常开支申请单
          case 8 :urls = '/index/findSchedule';break;//公告
          case 9 :urls = '/index/findSchedule';break;//日程
          default:urls = '/index/findSchedule';break;//出差申请单
        }
        this.router.navigate([urls]);
      }
    }
  )
}
ngOnInit() {
  this.getList();
}

}
