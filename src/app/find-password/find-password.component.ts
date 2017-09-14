import { Component, OnInit } from '@angular/core';
import {HttpService} from '../share/http.service'
import {UtilService}from '../share/util.service';

@Component({
  selector: 'app-find-password',
  templateUrl:'./find-password.component.html',
  styleUrls: ['./find-password.component.css']
})
export class FindPasswordComponent implements OnInit {
  passwordState:number=1;
  tImgUrl:string="../../assets/images/"+this.passwordState+".png";
  private phone:string;
  private yzm:string;
  private password:string;
  private zcpassword:string;
  private isActive:Boolean=false;
  private isdisabled:Boolean=true;
  private utilService:UtilService;
  private pwderrorState:number;
  private codeerrorState:number;
  private zcpwdsturs:number;
  private paracont:string;
  private paraclass:string;
  private paraevent:Boolean;
  private codeText:string='获取验证码';
  private dataCode:any;

  constructor(public http:HttpService) { 
    this.utilService=new UtilService();
  }
  ngOnInit() {
  }
  //获取焦点事件
  yzmobile(){
  //验证手机号
    if(this.phone!=''){
        if(!this.utilService.checkPhone(this.phone)){
          this.pwderrorState=2;
        }else{
          this.pwderrorState=null;
          //获取验证码按钮
          this.isActive = true; 
          this.isdisabled=false; 
        }
    }else{
          this.pwderrorState=1;
    }
  };
  //获取验证码验证手机号是否注册
  yzmCode(wait):void{
    this.http.postForm('/api/sendCode',{'mobile':this.phone}).subscribe(
       data=>{
         this.dataCode = data;
         if(this.dataCode.result ==true){
           this.waitCode(wait);
         }else{
            this.pwderrorState=3;
            this.isActive = false;
            this.isdisabled=true;
         }
       }
    )
   
  };
  //验证码倒计时
  waitCode(wait):void{
      if(wait == 0){
        this.codeText='重新获取';
        this.isActive = true;
        this.isdisabled=false;
      }else{
        wait --;
        this.isActive = false;
        this.isdisabled=true;
        this.codeText='重新发送('+wait+')';
        setTimeout(() => {
            this.waitCode(wait);
         }, 1000);
      }
  };
  //下一步
  step1(){
    if(this.yzm.length == 4){
      this.http.postForm('/system/getSignature',{'code':this.yzm}).subscribe(
        data=>{
          this.dataCode = data;
          if(this.dataCode.statusCode == 200){
            this.passwordState=2;
            this.yancode();
          }
        }
      )
    }else{
      this.codeerrorState = 1;
    }
  };
  //验证验证码
  yancode(){
    this.http.get('/api/checkSendCode',{'tel':this.phone,'code':this.yzm}).subscribe(
      data=>{
        this.dataCode = data;
        if(this.dataCode.code == 200){
            this.passwordState=2;
            this.tImgUrl="../../assets/images/2.png";
        }else if(this.dataCode.code == 312){
          this.codeerrorState = 2;
        }
      }
    )
  };
  //下一步确认修改
  step2(){
    if(this.password == this.zcpassword){
      this.http.postForm('/api/restPass',{'mobile':this.phone,'password':this.zcpassword}).subscribe(
        data=>{
          this.dataCode = data;
          if(this.dataCode.code == 200){
            this.passwordState=3;
            this.tImgUrl="../../assets/images/3.png";
          }
        }
      )
    }else{
      this.zcpwdsturs=1
    }
  }
//zuihou
}