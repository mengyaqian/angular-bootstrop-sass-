import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import { NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-holiday-rule',
  templateUrl:'./holiday-rule.component.html',
  styleUrls: ['./holiday-rule.component.css']
})
export class HolidayRuleComponent implements OnInit {
  listData:any=[];
  holidayInfo:any={};
  holidayInforestType:any='';//休假规则，分次true,连续false
  holidayInfostartDate:any='';//开始日期
  holidayInfosumDays:any='';//总天数
  holidayInforestDays:any='';//允许连续休假天数
  constructor(private _http:HttpService,private modalService: NgbModal) { }
  //获取列表
  getDepartList(){
    this._http.get('/holidaysRule/findHolidaysRuleList','').subscribe(
      data=>{
        this.listData =data.data;
      }
    )
  }
  //编辑假期规则
  editHoliday(id,holiday){
    //年假和其他连续休假的假期没有总天数。连续休假的假期没有开始日期和有效时长。
    this._http.get('/holidaysRule/findOne/'+id,'').subscribe(
      data=>{
        this.holidayInfo =data.data;
        this.holidayInforestType = this.holidayInfo.restType ? '分次':'连续';
        this.holidayInfostartDate = this.holidayInfo.startDate ?this.getFormatTwo(this.holidayInfo.startDate):'';
        this.holidayInfosumDays = this.holidayInfo.sumDays ?this.holidayInfo.sumDays:'';
        this.holidayInforestDays = this.holidayInfo.restDays ?this.holidayInfo.restDays:'';
        this.modalService.open(holiday,{size:"lg"});//打开弹框
      }

    )
  }
  
  //保存假期规则
  saveHoliday(d){
    var startDate = (new Date((new Date().getFullYear()+'-'+this.holidayInfostartDate+' 00:00:00').replace(/-/g, '/'))).getTime();
    let requestData={
      exceedSubmit:this.holidayInfo.exceedSubmit,
      id:this.holidayInfo.id,
      leaveTypeName:this.holidayInfo.leaveTypeName,
      restDays:this.holidayInforestDays,
      restType:this.holidayInfo.restType,
      startDate:startDate,
      status:this.holidayInfo.status,
      sumDays:this.holidayInfosumDays,
    };
    this._http.post('/holidaysRule/updateHolidaysRuleConfig',requestData).subscribe(
      data=>{
        d('Cross click');
        this.getDepartList();
      }
    )
    
  }
 //时间戳转化为月日
 getFormatTwo(time){
  let _time = new Date(time);
  let _mon = _time.getMonth()+1;
  let _day = _time.getDate();
  return (_mon <10 ? ('0'+_mon):_mon)+'-'+(_day <10 ? ('0'+_day):_day);
}

  ngOnInit() {
    this.getDepartList();
  }

}
