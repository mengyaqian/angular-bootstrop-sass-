import { Component,ViewChild,DoCheck } from '@angular/core';

import {UtilService} from '../share/util.service';
import {HttpService} from '../share/http.service';
import { NgbModal,NgbActiveModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl:'./register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements DoCheck {
  closeResult: string;
  registerState:number=1;
  registerImgUrl:string="../../assets/images/"+this.registerState+".png";

  pwd1Status:boolean=true;
  pwd2Status:boolean=true;
  telStatus:number;//1格式不正确，2已注册
  codeStatus:boolean=true;
  sendCodeStatus:boolean=true;
  creatOrgStatus:number;//0企业名称为空，1真是名称为空,2真是名称格式不正确

  codeText:string='获取验证码';
  pwd1error:string='请输入6-20位的密码';
  error:string = '';
  stepOne:any={
    tel:'',
    code:'',
    pwd1:'',
    pwd2:''
  };
  stepTwo:any={
    enterprisename:'',
    truename:''
  };
  dataTel:any;
  dataCode:any;
  

  constructor(private activeModal: NgbActiveModal,private _util:UtilService,private _http:HttpService,private modalService: NgbModal) { }

  
  ngDoCheck(){

  }

  //密码
  pwdCompare(pwd):void{
    if(pwd == 'pwd1'){
       if(this.stepOne.pwd1 ==''){
         this.pwd1Status=true;
       }else if(this.stepOne.pwd1.length<6 || this.stepOne.pwd1.length>20){
         this.pwd1Status=false;
       }else{
         this.pwd1Status=true;
       }
    }else{
      if(this.stepOne.pwd2 ==''){
        this.pwd2Status =true;
      }else if(this.stepOne.pwd1 != this.stepOne.pwd2){
          this.pwd2Status =false;
      }else{
         this.pwd2Status =true;
      }
    }
  };

    //验证手机号
  telCompare():void{
      if(!this._util.checkPhone(this.stepOne.tel) && this.stepOne.tel !=''){
        this.telStatus = 1;
      }else{
        if(this.stepOne.tel.length==11){
          this._http.postForm('/user/verificationUserName',{'tel':this.stepOne.tel}).subscribe(
            data => {
              this.dataTel = data;
              if(this.dataTel.message == '1'){//手机号已注册
                    this.telStatus = 2;
              }else{//验证通过
                    this.telStatus = null;
              }
          })
        }else
          this.telStatus=null;
      } 
  };

  //获取验证码
  getCode(wait):void{
    this._http.postForm('/user/verifyCode',{'tel':this.stepOne.tel}).subscribe(
       data=>{
         this.dataCode = data;
         if(this.dataCode.statusCode ==200){
           this.waitCode(wait);
         }
       }
    )
   
  };
  //验证码倒计时
  waitCode(wait):void{
      if(wait == 0){
        this.codeText='重新获取';
        this.sendCodeStatus = true;
      }else{
        wait --;
        this.sendCodeStatus = false;
        this.codeText='重新发送('+wait+')';
        setTimeout(() => {
            this.waitCode(wait);
         }, 1000);
      }
  }

  //下一步
  nextStep(): void {
    if(this.stepOne.pwd1 == this.stepOne.pwd2){
      this._http.postForm('/user/verifyCode',{'tel':this.stepOne.tel,'operate':'verify','code':this.stepOne.code}).subscribe(
        data=>{
          this.dataCode = data;
          if(this.dataCode.statusCode ==201){
            this.codeStatus=true;
            this.registerOne();
          }else if(this.dataCode.statusCode ==300){
              this.codeStatus=false;
          }
        }
      )
    }else{
       this.pwd2Status=false;
    }
  }

  //注册个人信息
  registerOne():void{
       this._http.postForm('/user/register',{
         type:0,
         tel:this.stepOne.tel,
         operate:'verify',
         code:this.stepOne.code,
         password:this.stepOne.pwd1,
         password1:this.stepOne.pwd2
       }).subscribe(
       data=>{
         this.dataCode = data;
         if(this.dataCode.statusCode =='200'){
           this.registerState=2;
           this.registerImgUrl="../../assets/images/2.png";
         }
       }
    )
  }
  //验证姓名
  regName(type):void{
    if(type==1 && this.stepTwo.enterprisename == ''){
      this.creatOrgStatus=0;
    }else if(type ==2 && this.stepTwo.truename == ''){
      this.creatOrgStatus=1;
    }else if(type ==2 && !this._util.checkName(this.stepTwo.truename)){
      this.creatOrgStatus=2;
    }else{
      this.creatOrgStatus=null;
    }
  }
  //企业信息验证
  stepTwoReg(d):void{
      if(this._util.checkName(this.stepTwo.truename)){
          this._http.postForm('/user/joinEnterprise',{
            enterprisename:this.stepTwo.enterprisename,
            realname:this.stepTwo.truename,
            mobile:this.stepOne.tel,
            diff:'2'
          }).subscribe(
          data=>{
            this.dataCode = data;
            if(this.dataCode.statusCode =='200'){
                this.registerState=3;
                this.registerImgUrl="../../assets/images/3.png";
                d();
            }
          }
          )
      }else{
        this.creatOrgStatus=2;
      }
  }
  //加入企业模态框
  joinOrg(content) {
    //this.modalService.open(content);
    this.modalService.open(content).result.then((result) => {
      console.log(result);
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        console.log(reason);
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
}

private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
  }

}
