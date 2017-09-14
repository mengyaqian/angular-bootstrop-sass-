import { Component, OnInit,Output,Input,EventEmitter,OnChanges } from '@angular/core';
import { HttpService} from '../../../../share/http.service';
import {CitySearchPipe} from '../../../../share/pipe/city-search.pipe';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.css']
})
export class SelectCityComponent implements OnChanges {
  @Input() cityShow:any;
  @Output() selected: any = new EventEmitter();
  cityList:any=[];
  cityListShow:any=[];
  issearch:any=false;
  
  constructor(private  _http:HttpService) { }
  //关闭选择框
  closeCity(){
    this.cityShow.isShow=false;
  }
 //加载城市
 getClityList(){
   this._http.get('/book/findCityHot','').subscribe(
     result=>{
      this.cityList = result;
      this.cityListShow = result.slice(0,16);
     }
   )
 }
 //选择城市
 selectCity(name){
    this.cityShow.city=name;
    this.cityShow.isShow=false;
    this.selected.emit(this.cityShow);
 }
 //当被绑定的输入属性的值发生变化时调用，首次调用一定会发生在 ngOnInit之前
 ngOnChanges(){
    if(this.cityShow.city !=''){
     this.issearch =true;
    }else{
      this.issearch=false
    }
 }

  ngOnInit() {
    this.getClityList();
  }

}


