import { Component,OnInit,DoCheck } from '@angular/core';
import {HttpService} from './share/http.service'

declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  constructor(private _http:HttpService) {}
  public loading:boolean;
  ngDoCheck(){
    this.loading=this._http.loadStatus
  }
  
}
