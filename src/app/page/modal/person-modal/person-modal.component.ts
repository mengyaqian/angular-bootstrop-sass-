import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../share/http.service';
import {CommonService} from '../../../share/common.service';
import { NgbModal,NgbActiveModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-person-modal',
  templateUrl:'./person-modal.component.html',
  styleUrls: ['./person-modal.component.css']
})
export class PersonModalComponent implements OnInit {
  private personData:any=[{users:[]}];
  private personSeoData:any=[{users:[]}];
  private selectedArr:any=[];
  private inputVal:string;
  private chanelButton=false;
  private personResult:string;


  constructor(private _http:HttpService,private _activeModal:NgbActiveModal,private _comm:CommonService) { }
  

  ngOnInit() {
    this.getPerson();
  }

  getPerson(){
    //获取联系人
    this._http.postForm('/web/actionChatUser',{ifAll:1}).subscribe(res=> {
        this.personResult=JSON.stringify(res.content);
        this.personData=res.content;
        this.personSeoData=res.content;
    });
  }

  fillter(){
    let personObj=JSON.parse(this.personResult);
    if(this.inputVal && this.inputVal!=''){
        let arr=[];
        for(let i=0;i<personObj.length;i++){
          let user=[];
          for(let j=0;j<personObj[i].users.length;j++){
            if(personObj[i].users[j].nickname.indexOf(this.inputVal)!=-1){
              user.push(personObj[i].users[j])
            }
          }
          if(user.length!=0){
            personObj[i].users=user;
            arr.push(personObj[i]);
          }
        }
        this.personSeoData=arr;
    }else{
      this.personSeoData=JSON.parse(this.personResult);
    }
  }

  funcus(){
    this.chanelButton=true;
    this.fillter();
  }

  chanelSelect(){
    this.inputVal='';
    this.chanelButton=false;
  }
  

  close(){
      this._activeModal.close();
  }

  allChange(item){
      for(let i=0;i<item.users.length;i++){
        if(item.checked){
          item.users[i].checked=true;
          if(this.selectedArr.length==0)
            this.selectedArr.push(item.users[i]);
          else{
            let selectBool=true;
            for(let j=0;j<this.selectedArr.length;j++){
              if(this.selectedArr[j].easemobId==item.users[i].easemobId)
                selectBool=false;
            }
            if(selectBool)
              this.selectedArr.push(item.users[i]);
          }
        }else{
          item.users[i].checked=false;
          this._comm.arrRemove(this.selectedArr,item.users[i])
        }
      }
  }

  doAddUsers(){
    this._activeModal.close(this.selectedArr);
  }

  selectPerson(user,item){
      let num=0;
      for(let i=0;i<item.users.length;i++){
        if(item.users[i].checked)
          num++;
      }
      if(num==item.users.length)
        item.checked=true;
      else
        item.checked=false;

      if(user.checked)
        this.selectedArr.push(user);
      else
        this._comm.arrRemove(this.selectedArr,user)
  }


}
