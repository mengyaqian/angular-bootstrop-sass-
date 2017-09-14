import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import { UtilService} from '../../../../share/util.service';
@Component({
  selector: 'app-didi',
  templateUrl: './didi.component.html',
  styleUrls: ['./didi.component.css']
})
export class DidiComponent implements OnInit {
  payStatus:any = [
    {status:-1,name:'全部'},
    {status:1,name:'个人支付'},
    {status:0,name:'企业支付'}
  ];
  carType:any=[
    {status:-1,name:'全部'},
    {status:2,name:'专车'},
    {status:3,name:'快车'},
    {status:1,name:'出租车'},
    {status:4,name:'代驾'}
  ];
  beginDate:any='';
  endDate:any='';
  pageCurrent:number=1;
  totalPage:number=0;
  listData:any=[];
  payStatusDefine:number=-1;//支付方式
  carTypeDefine:number=-1;//用车方式
  fkbStatus:number=-1;//已报销1，未报销0，全部-1

  constructor(private _http:HttpService) { }
  getList(){
    let requestData:any = {
      payType:this.payStatusDefine,
      startDate:this.beginDate,
      endDate:this.endDate,
      page:this.pageCurrent,
      pageSize:10,
      carType:this.carTypeDefine,
      fkbStatus:this.fkbStatus
    }
    this._http.get('/dd/findOrder',requestData).subscribe(
      data=>{
        //模拟数据
       // let res = {"result":true,"orderDetails":{"total":26,"orderDetails":[{"order_id":"861463684073410017","create_time":"2017-05-29 13:46:49","require_level":"600","city":"4","start_name":"上海天鹤大酒店-南门附近","end_name":"东平国家森林公园","departure_time":"2017-05-29 13:46:49","finish_time":"2017-05-29 14:29:14","status":"2","member_id":"8163248746495758023","pay_type":"1","pay_time":"2017-05-29 14:29:55","total_price":"54.91","actual_price":"53.91","is_invoice":"0","use_car_type":"3","normal_distance":"16.70","call_phone":"13072123589","passenger_phone":"13072123589","budget_center_id":"0","use_car_config_id":"0","city_name":"上海市","fkbStatus":0,"createdOn":"Jun 5, 2017 9:11:21 AM","createdBy":7047,"updatedOn":"Jun 5, 2017 9:11:21 AM","updatedBy":7047,"createOrgCode":"677HPME","id":"ff8080815c72b57e015c75ce699b00c6"},{"order_id":"846929112090562459","create_time":"2017-05-27 01:37:07","require_level":"600","city":"4","start_name":"腾飞莲花商务园","end_name":"建中路171弄小区","departure_time":"2017-05-27 01:35:59","finish_time":"2017-05-27 01:48:58","status":"2","member_id":"8163248746495758023","pay_type":"1","pay_time":"2017-05-27 01:49:27","total_price":"17.26","actual_price":"16.91","is_invoice":"0","use_car_type":"3","normal_distance":"4.30","call_phone":"13072123589","passenger_phone":"13072123589","budget_center_id":"0","use_car_config_id":"0","city_name":"上海市","fkbStatus":0,"createdOn":"Jun 5, 2017 9:11:21 AM","createdBy":7047,"updatedOn":"Jun 5, 2017 9:11:21 AM","updatedBy":7047,"createOrgCode":"677HPME","id":"ff8080815c72b57e015c75ce699b00c7"},{"order_id":"840271127339617388","create_time":"2017-05-25 22:03:35","require_level":"600","city":"4","start_name":"腾飞莲花商务园","end_name":"建中路171弄小区","departure_time":"2017-05-25 22:03:35","finish_time":"2017-05-25 22:14:49","status":"2","member_id":"8163248746495758023","pay_type":"1","pay_time":"2017-05-25 22:27:26","total_price":"13.00","actual_price":"13.00","is_invoice":"0","use_car_type":"3","normal_distance":"3.80","call_phone":"13072123589","passenger_phone":"13072123589","budget_center_id":"0","use_car_config_id":"0","city_name":"上海市","fkbStatus":0,"createdOn":"Jun 5, 2017 9:11:21 AM","createdBy":7047,"updatedOn":"Jun 5, 2017 9:11:21 AM","updatedBy":7047,"createOrgCode":"677HPME","id":"ff8080815c72b57e015c75ce699b00c8"},{"order_id":"827752109823250094","create_time":"2017-05-23 18:14:27","require_level":"600","city":"4","start_name":"腾飞莲花商务园","end_name":"建中路171弄小区","departure_time":"2017-05-23 18:14:27","finish_time":"2017-05-23 18:31:58","status":"2","member_id":"8163248746495758023","pay_type":"1","pay_time":"2017-05-23 18:38:21","total_price":"16.72","actual_price":"16.72","is_invoice":"0","use_car_type":"3","normal_distance":"4.67","call_phone":"13072123589","passenger_phone":"13072123589","budget_center_id":"0","use_car_config_id":"0","city_name":"上海市","fkbStatus":0,"createdOn":"May 25, 2017 7:43:02 PM","createdBy":7047,"updatedOn":"May 25, 2017 7:43:02 PM","updatedBy":7047,"createOrgCode":"677HPME","id":"ff8080815c00a00a015c3f6ac99f1c65"},{"order_id":"758661769707671433","create_time":"2017-05-11 20:15:41","require_level":"600","city":"4","start_name":"腾飞莲花商务园","end_name":"建中路171弄小区","departure_time":"2017-05-11 20:15:41","finish_time":"2017-05-11 20:30:54","status":"2","member_id":"8163248746495758023","pay_type":"1","pay_time":"2017-05-11 20:31:28","total_price":"14.66","actual_price":"14.66","is_invoice":"0","use_car_type":"3","normal_distance":"4.20","call_phone":"13072123589","passenger_phone":"13072123589","budget_center_id":"0","use_car_config_id":"0","city_name":"上海市","fkbStatus":1,"createdOn":"May 18, 2017 11:57:16 AM","createdBy":7047,"updatedOn":"May 18, 2017 11:57:16 AM","updatedBy":7047,"createOrgCode":"677HPME","id":"ff8080815c00a00a015c19b3d8ad094a"},{"order_id":"9189343948548099772","create_time":"2017-05-04 20:38:15","require_level":"600","city":"4","start_name":"腾飞莲花商务园","end_name":"建中路171弄小区","departure_time":"2017-05-04 20:38:15","finish_time":"2017-05-04 20:49:07","status":"2","member_id":"8163248746495758023","pay_type":"1","pay_time":"2017-05-04 20:50:16","total_price":"13.89","actual_price":"13.89","is_invoice":"0","use_car_type":"3","normal_distance":"4.30","call_phone":"13072123589","passenger_phone":"13072123589","budget_center_id":"0","use_car_config_id":"0","city_name":"上海市","fkbStatus":1,"createdOn":"May 18, 2017 11:57:16 AM","createdBy":7047,"updatedOn":"May 18, 2017 11:57:16 AM","updatedBy":7047,"createOrgCode":"677HPME","id":"ff8080815c00a00a015c19b3d8ad094b"},{"order_id":"9143163404626186089","create_time":"2017-04-26 21:29:11","require_level":"600","city":"4","start_name":"腾飞莲花商务园","end_name":"建中路171弄小区","departure_time":"2017-04-26 21:29:11","finish_time":"2017-04-26 21:37:47","status":"2","member_id":"8163248746495758023","pay_type":"1","pay_time":"2017-04-26 21:37:50","total_price":"13.00","actual_price":"13.00","is_invoice":"0","use_car_type":"3","normal_distance":"4.30","call_phone":"13072123589","passenger_phone":"13072123589","budget_center_id":"0","use_car_config_id":"0","city_name":"上海市","fkbStatus":1,"createdOn":"May 18, 2017 11:57:16 AM","createdBy":7047,"updatedOn":"May 18, 2017 11:57:16 AM","updatedBy":7047,"createOrgCode":"677HPME","id":"ff8080815c00a00a015c19b3d8ad094c"},{"order_id":"9102366167545695686","create_time":"2017-04-19 20:37:05","require_level":"600","city":"4","start_name":"腾飞莲花商务园","end_name":"建中路171弄小区","departure_time":"2017-04-19 20:37:05","finish_time":"2017-04-19 20:49:40","status":"2","member_id":"8163248746495758023","pay_type":"1","pay_time":"2017-04-19 20:49:44","total_price":"13.00","actual_price":"13.00","is_invoice":"0","use_car_type":"3","normal_distance":"0.60","call_phone":"13072123589","passenger_phone":"13072123589","budget_center_id":"0","use_car_config_id":"0","city_name":"上海市","fkbStatus":1,"createdOn":"May 18, 2017 11:57:16 AM","createdBy":7047,"updatedOn":"May 18, 2017 11:57:16 AM","updatedBy":7047,"createOrgCode":"677HPME","id":"ff8080815c00a00a015c19b3d8ad094d"},{"order_id":"9068029850506776100","create_time":"2017-04-13 22:29:34","require_level":"600","city":"4","start_name":"腾飞莲花商务园","end_name":"建中路171弄小区","departure_time":"2017-04-13 22:29:34","finish_time":"2017-04-13 22:44:00","status":"2","member_id":"8163248746495758023","pay_type":"1","pay_time":"2017-04-13 22:44:02","total_price":"14.00","actual_price":"14.00","is_invoice":"0","use_car_type":"3","normal_distance":"3.90","call_phone":"13072123589","passenger_phone":"13072123589","budget_center_id":"0","use_car_config_id":"0","city_name":"上海市","fkbStatus":1,"createdOn":"May 18, 2017 11:57:16 AM","createdBy":7047,"updatedOn":"May 18, 2017 11:57:16 AM","updatedBy":7047,"createOrgCode":"677HPME","id":"ff8080815c00a00a015c19b3d8ad094e"},{"order_id":"9054108634414862084","create_time":"2017-04-11 12:52:12","require_level":"600","city":"4","start_name":"张江路/紫薇路(路口)西南侧","end_name":"腾飞莲花商务园","departure_time":"2017-04-11 12:52:12","finish_time":"2017-04-11 13:01:16","status":"2","member_id":"8163248746495758023","pay_type":"1","pay_time":"2017-04-11 13:01:19","total_price":"14.60","actual_price":"14.60","is_invoice":"0","use_car_type":"3","normal_distance":"5.00","call_phone":"13072123589","passenger_phone":"13072123589","budget_center_id":"0","use_car_config_id":"0","city_name":"上海市","fkbStatus":0,"createdOn":"May 18, 2017 11:57:16 AM","createdBy":7047,"updatedOn":"May 18, 2017 11:57:16 AM","updatedBy":7047,"createOrgCode":"677HPME","id":"ff8080815c00a00a015c19b3d8ad094f"}]},"code":200,"openFlag":1};
        this.listData = data.orderDetails.orderDetails;
        this.totalPage =data.orderDetails.total;
      }
    )
  }
  switchCarType(v){
    switch(v){
      case "1":
      return "出租车";
      case  "2":
      return "专车";
      case "3" :
      return "快车";
      case "4" :
      return "代驾";
    }
  }
  dateSelected(data,type){
        if(type=='begin'){
            this.beginDate = data;
        }else{
          this.endDate = data;
        }
  }
  reset(){
    this.beginDate = '';
    this.endDate='';
    this.payStatusDefine=-1;
    this.carTypeDefine=-1;
    this.fkbStatus=-1;
  }

  ngOnInit() {
    this.getList();
  }

}
