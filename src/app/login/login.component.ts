import { Component ,DoCheck} from '@angular/core';
import { Router } from '@angular/router';

import {UtilService}from '../share/util.service';
import {HttpService} from '../share/http.service'

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements DoCheck{
  login_state:number =4;
  user:any={
    mobile:'',
    password:''
  }

  utilService:UtilService;
  errorState:number;

  constructor(public http:HttpService,private _router:Router) { 
    this.utilService=new UtilService();
  }

  ngDoCheck(){
      if(this.user.mobile=='')
            this.errorState=null;
  }

  onLoginType(type){
    this.login_state=type;
  }

  onBlur(){
      if(this.user.mobile!=''){
          if(!this.utilService.checkPhone(this.user.mobile)){
            this.errorState=1;
          }else
            this.errorState=null;
      }else
            this.errorState=null;
  }

  login(){
    alert(1);
    this.http.postForm('/user/newlogin',this.user).subscribe(res=> {
          console.log(res); 
          //this._router.navigate(['/index/home'])
          let user={
             name:'薛梅123',
             id:5502,
             departId:973,
          }
          sessionStorage.setItem('userInfo',JSON.stringify(user))


          //JSON.parse(sessionStorage.getItem('userInfo'))
      });
  }



}
