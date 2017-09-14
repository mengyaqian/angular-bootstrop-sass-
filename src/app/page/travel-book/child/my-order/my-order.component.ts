import { Component, OnInit } from '@angular/core';
import {TravelBookComponent} from '../../travel-book.component';
import { HttpService} from '../../../../share/http.service';
import { UtilService} from '../../../../share/util.service';

@Component({
  selector: 'app-my-order',
  templateUrl:'./my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
///
listData:any=[];
approvalNo:any ='';
beginDate:any;
endDate:any;
toCity:any ='';
pageCurrent:number=1;
totalPage:number=0;
tbType:number=2;//火车票1，机票2，酒店3
cityTxt:string='到达城市';
payStatus:any = [
  {status:-2,name:'全部'},
  {status:1,name:'个人支付'},
  {status:0,name:'企业支付'}
];
orderStatus:any=[
  {status:-2,name:'全部'},
  {status:1,name:'已出行'},
  {status:0,name:'已支付'},
  {status:2,name:'已报销'},
];
orderstatusDefine:number=1;//订单状态
payStatusDefine:number=1;//支付方式

  constructor(private _http:HttpService,private _util:UtilService) { }
 
  getList(type){
    this.tbType = type;
    this.cityTxt = (type == 3 ? '出差城市':'到达城市');
    this.orderStatus[1].name = (type == 3 ? '已入住':'已出行');
    let sendData = {
      tbType:type,
      approvalNo:this.approvalNo,
      startTime:this.beginDate+' 00:00:00',
      endTime:this.endDate+' 23:59:59',
      toCity:this.toCity,
      status:this.orderstatusDefine,
      payType:this.payStatusDefine
    }
    this._http.get('/travelBook/new/queryNewTravelBook',sendData).subscribe(
      data=>{
         //this.listData = data.message;
        // let result = {"statusCode":"200","message":[{"amount":500.0,"orderNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":1,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":0,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":1,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},{"amount":500.0,"orderNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":1,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":1,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":0,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},{"amount":500.0,"orderNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":1,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":1,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":2,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},{"amount":500.0,"orderNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":1,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":1,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":1,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},{"amount":500.0,"orderNo":"471320170303160417557","billTripId":"402881f35a9320c1015a9332b21f000b","breakfast":1,"city":"上海","cityName":"","contactName":"","contactTel":"","createOrgCode":"877TZYB","createdBy":4713,"createdOn":{"date":6,"day":1,"hours":13,"minutes":25,"month":2,"nanos":0,"seconds":45,"time":1488777945000,"timezoneOffset":-480,"year":117},"currency":"","deliveryAddress":"纳贤路60号","detailAddress":"","discount":8.0,"endDate":{"date":9,"day":4,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":6,"time":1489037046000,"timezoneOffset":-480,"year":117},"endPortName":"北京机场","fuelPrice":50.0,"id":3,"levelCode":"","levelName":"头等舱","orderId":"231320","orderName":"南航","passengerId":"13,14,15","passengers":[],"payType":1,"price":500.0,"rate":0.0,"roomCode":2,"roomDays":4,"roomName":"","roomNum":3,"startDate":{"date":8,"day":3,"hours":13,"minutes":24,"month":2,"nanos":0,"seconds":44,"time":1488950684000,"timezoneOffset":-480,"year":117},"startPortName":"上海虹桥机场","status":1,"ticketType":2,"toCity":"北京","travelbookId":"6","updatedBy":0,"updatedOn":{"date":6,"day":1,"hours":16,"minutes":47,"month":2,"nanos":0,"seconds":34,"time":1488790054000,"timezoneOffset":-480,"year":117},"uuid":"","vendorName":"南方航空"},]};
         this.listData =data.message;
      }
    )
  }
   //日期初始化
 beginDateInput(){	
  let t2 = new Date().valueOf();
  let startTime = new Date(t2 - (1000*60*60*24*30));
  this.beginDate = this._util.getTimestr(startTime).substr(0,10).replace(/\//g,'-');
  this.endDate = this._util.getTimestr(new Date()).substr(0,10);
}

dateSelected(data,type){
    if(type=='begin'){
        this.beginDate = data;
    }else{
      this.endDate = data;
    }
}
//重置
reset(){
   this.approvalNo = '';
   this.toCity='';
   this.orderstatusDefine=1;
   this.payStatusDefine=1;
   this.beginDateInput();
}

  ngOnInit() {
    this.beginDateInput();
    this.getList(2);
  }

}
