import { Component, OnInit,Input} from '@angular/core';
import {NgbModal, NgbActiveModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpService} from '../../../share/http.service';
import { UtilService} from '../../../share/util.service';
import {PersonModalComponent} from '../person-modal/person-modal.component'


@Component({
  selector: 'app-creat-business',
  templateUrl: './creat-business.component.html',
  styleUrls: ['./creat-business.component.css']
})
export class CreatBusinessComponent implements OnInit {
  @Input() openType:any;
  @Input() openuuid:any;
  closehref:boolean=false;
  cityShow:any={
    isShow:false,
    left:'95px',
    top:'21px',
    type:1,
    index:0,
    city:''  
  };
  closeResult:string='';
  windowHeight:string='600px';
formInfo:any={
      billId:'',//单据id
      orderNo:'',//单据编号
      currencyList:[],//币种列表
      homeCurreny:-1,
      staticdataList:{
        user:{},
        costProjectList:[],
        departList:[],
        org:{},
        paymentTypeList:[],
        projectList:[]
      },
      departId:-1,//选中的部门id
      projectId:'0',//选中的记账项目id
      costprojectId:'-1', //选中费用项目id
      toggerPersonName:'',//同行人姓名
      toggerPersonId:'',//同行人id
      toggerPersonNum:0,//同行人数
      applyType:[ //审批方式选择
        {value:1,name:'部门审批'},
        {value:2,name:'项目审批'},
      ],
      applystatus:'-1',//选择的审批方式
      remark:'',//事由
      tripTpl:{//行程模板
        startTime:'',
        startCity:'',
        startCityCode:'',
        endTime:'',
        toCity:"",
        toCityCode:"",
        tbType:'0',
        hotelBooking:false,
        remark:''
      },
      tripList:[],//行程列表
      costTpl:{//费用预算模板
        costid:'-1',
        costProjectName:'请选择费用项目',
        money:'',
        currency:-1,
        currencyName:'',
        rate:'1'
      },
      costList:[],//费用预算列表
      ifAdvance:false, //是否预支
      ifAllAdvance:false,//是否全额预支
      //现金预支信息
      advanceObj:{ 
        advancPayType:'PT01', 
        advanceKind:0, 
        advanceReave:'薛梅123',
        bankName:'',
        bankNo:'',
        advanceList:[]
      },
      applyUserIds:'',//开放式审批流的审批人id
      bankList:[],
      //编辑信息
      editInfo:[]
}

  constructor(private activeModal: NgbActiveModal,private _http:HttpService,private modalService: NgbModal,private _util:UtilService) { }
  closeBill(){
    this.activeModal.close('Cross click')
  }
  //是否为编辑 1新增，2编辑
  getEditInfo(){
        this._http.postForm('/bill/bussiness/edit',{type:0,uuid:this.openuuid}).subscribe(
          result=>{
            let res = result.content[0];
            this.formInfo.editInfo = res;
            this.formInfo.billId = res.id;
            this.formInfo.orderNo = res.orderNo;
            this.formInfo.ifAdvance = res.ifAdvance;
            this.formInfo.toggerPersonId=this.gettoggerPerson('id');
            this.formInfo.toggerPersonName = this.gettoggerPerson('name');
            this.formInfo.toggerPersonNum = res.passengerBean.length;
            this.formInfo.applystatus = res.approvalType;
            this.formInfo.remark = res.remark;
            this.formInfo.departId = res.tallyDepartId;
            this.formInfo.projectId = res.tallyProjectId;
            this.formInfo.tripList = this.formattripList();
            this.formInfo.costList = this.formatCostList(); //费用项目id和币种id
            this.formInfo.ifAllAdvance = res.ifAll;
            this.formInfo.advanceObj.advancPayType = res.payType;
            this.formInfo.advanceObj.advanceKind = res.currencySettleType;
            this.formInfo.advanceObj.advanceReave = res.receiverName;
            this.formInfo.advanceObj.bankNo = res.bankNo;
            this.formInfo.advanceObj.bankName = res.bankName;
            this.formInfo.advanceObj.advanceList = this.formatAdvanList();

          }
        )
  }
  //获取币种列表
 getCurrencyList(){
   this._http.postForm('/fnconfig/currency/list','').subscribe(
    data=>{
      this.formInfo.currencyList = data.message;
      for (let value of data.message) {
         if(value.homeCurr == 1){
           this.formInfo.homeCurreny = value.id;
           this.formInfo.costTpl.currency =  value.id;
           this.formInfo.costTpl.currencyName = value.code;
           this.formInfo.costTpl.rate = value.rate;
         }   
      }
      if(this.openType != 2){
        this.addCost();
      }
     }
    )
 }
 //获取员工部门项目等信息
 getStaticdata(){
  this._http.get('/bill/staticdata','').subscribe(
    data=>{
     this.formInfo.staticdataList.user=data.data.user;
     this.formInfo.staticdataList.costProjectList=data.data.costProjectList;
     this.formInfo.staticdataList.departList=data.data.departList;
     this.formInfo.staticdataList.org = data.data.org;
     this.formInfo.staticdataList.paymentTypeList = data.data.paymentTypeList;
     this.formInfo.staticdataList.projectList = data.data.projectList;
     this.formInfo.departId = data.data.user.departmentId;
     }
    )
 }
 //新增行程
 addTrip(){
   let obj=JSON.stringify(this.formInfo.tripTpl);
   this.formInfo.tripList.push(JSON.parse(obj));
 }
 //删除行程
 deleteTrip(i){
   this.formInfo.tripList.splice(i,1);
 }
 //新增费用预算
 addCost(){
   let obj = JSON.stringify(this.formInfo.costTpl);
   this.formInfo.costList.push(JSON.parse(obj));
   this.formInfo.advanceObj.advanceList = this.formInfo.costList;
 }
 //删除费用预算
 deleteCost(i){
  this.formInfo.costList.splice(i,1);
  this.formInfo.advanceObj.advanceList = this.formInfo.costList;
 }
 //选择是否住宿
 changeHotel(event,i){
   this.formInfo.tripList[i].hotelBooking=event.target.checked;
 }
 //是否预支
 advchexk(val){
   var res = val.target.checked;
   if(res){
    this.formInfo.advanceObj.advanceList = this.formInfo.costList;
   }
 }
 //选择币种其他赋值
 kindChange(event,index){
  let that = this;
  let list = that.formInfo.currencyList;
    list.find(function(x){
        if(x.id==event){
          that.formInfo.costList[index].currencyName=x.code;
          that.formInfo.costList[index].rate = x.rate;
        }
      })
      this.formInfo.advanceObj.advanceList = this.formInfo.costList;
 }
 //金额变化
 amountChange(value,i){
  this.formInfo.advanceObj.advanceList = this.formInfo.costList;
  
 }
 //选择费用项目赋值
 costProjectChange(event,index){
  let that = this;
  let list = that.formInfo.staticdataList.costProjectList;
   list.find(function(x){
       if(x.id==event){
         that.formInfo.costList[index].costProjectName=x.name;
       }
   })
 }
 //查询银行卡列表
 getBnakList(){
   let that = this;
   that._http.get('/userBankAccount/findUserBanks','').subscribe(
     result=>{
      that.formInfo.bankList = result.result;
      result.result.find(function(x){
        if(x.ifDefaultAccountNo== 1){
          that.formInfo.advanceObj.bankName=x.bankName;
          that.formInfo.advanceObj.bankNo = x.bankNo;
        }
      })
     }
   )
 }
 //选择同行人
 choosePartner(){
  this.modalService.open(PersonModalComponent,{size:'sm'}).result.then((result) => {
    console.log(result);
    if(!result)
      return false;
    
    let nameArr = [];
    let idArr = [];
    for(let v of result){
      nameArr.push(v.nickname);
      idArr.push(v.id);
    }
    this.formInfo.toggerPersonName = nameArr.join(',');
    this.formInfo.toggerPersonId = idArr.join(',');
    this.formInfo.toggerPersonNum=result.length;
    this.closeResult = `Closed with: ${result}`;
}, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
});
}

private getDismissReason(reason: any): string {
  ModalDismissReasons.BACKDROP_CLICK
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
}

 
 //计算金额
 getAmount(){
   let sum=0;
   for(let i of this.formInfo.costList){
     sum += i.money*i.rate;
   }
   return sum.toFixed(2);
 }

 //根据部门id获取名称
 getName(type,id){ //type:部门1，项目2
  let that = this;
  let list = type == 1 ? that.formInfo.staticdataList.departList:that.formInfo.staticdataList.projectList;
  for(let value of list){
    if(value.id == id){
      return (type == 1 ? value.name: value.projectName);
    }
  }
 }

 //预算费用明细格式化
 formatList(){
    let costString = [];
    for(let i of this.formInfo.costList){
      costString.push(i.costid+'-'+i.costProjectName+'-'+i.money+'-'+i.currency+'-'+i.currencyName);
    }
    return costString.join(',');
 }
 //预支金额明细
 formatAdvance(){
   let costString = [];
   let arrCurreny=[];
   let arrCurrenyId = [];
   let arrMoney=[];
   for(let i of this.formInfo.advanceObj.advanceList){
     var inarr = arrCurreny.indexOf(i.currencyName);
     if(inarr<0){
       arrCurreny.push(i.currencyName);
       arrMoney.push(i.money);
       arrCurrenyId.push(i.currency);
     }else{
       arrMoney[inarr] +=i.money;
     }
   }
   for(let j=0; j<arrCurrenyId.length;j++){
    costString.push(arrCurrenyId[j]+'-'+arrCurreny[j]+'-'+arrMoney[j]);
   }
   return costString.join(',');
 }
 //获取同行人格式化 type:id
 gettoggerPerson(type){
   let datas=[];
   if(type == 'id'){
      for(let value of this.formInfo.editInfo.passengerBean){
        datas.push(value.userId);
      }
    }else{
      for(let value of this.formInfo.editInfo.passengerBean){
        datas.push(value.passengerName);
      }
    }
   
   return datas.join(',');
 }
 //行程格式化
 formattripList(){
  for(let value of this.formInfo.editInfo.travelBookbeans){
   let obj = JSON.stringify({
        startTime:value.startTime.substring(0,10),
        startCity:value.startCity,
        startCityCode:'1',
        endTime:value.endTime.substring(0,10),
        toCity:value.toCity,
        toCityCode:"1",
        tbType:value.tbType,
        hotelBooking:value.hotelBooking,
        remark:value.remark
    })
    this.formInfo.tripList.push(JSON.parse(obj));
  }
  return  this.formInfo.tripList;
 }
 //预算格式化
 formatCostList(){
   for(let value of this.formInfo.editInfo.formatCostBudgets){
    let obj = JSON.stringify({
      costid:value.budgetTypes[0].costBudgetId,
      costProjectName:value.budgetTypes[0].costBudgetName,
      money:value.amount,
      currency:value.budgetTypes[0].currencyId,
      currencyName:value.code,
      rate:value.rate
   })
   this.formInfo.costList.push(JSON.parse(obj));
  }
  
    /* if(value.budgetTypes.length<2){
     let obj = JSON.stringify({
        costid:value.budgetTypes[0].costBudgetId,
        costProjectName:value.budgetTypes[0].costBudgetName,
        money:value.amount,
        currency:value.budgetTypes[0].currencyId,
        currencyName:value.code,
        rate:value.rate
     })
     this.formInfo.costList.push(JSON.parse(obj));
    }else{
      for(let v of value.budgetTypes){
        let obj = JSON.stringify({
          costid:v.costBudgetId,
          costProjectName:v.costBudgetName,
          money:v.amount,
          currency:v.currencyId,
          currencyName:v.currencyName,
          rate:v.rate
       })
       this.formInfo.costList.push(JSON.parse(obj));
      }
    }
  }*/
   return this.formInfo.costList;
 }
 //预支信息格式化
 formatAdvanList(){
  for(let value of this.formInfo.editInfo.advances){
      let obj = JSON.stringify({
          costid:'-1',
          costProjectName:'',
          money:value.amount,
          currency:value.currencyId,
          currencyName:value.currency,
          rate:value.exchangeRate
      })
      this.formInfo.advanceObj.advanceList.push(JSON.parse(obj));
  }
  return this.formInfo.advanceObj.advanceList;
}
//信息验证
doCheckInfo(){
  if(this.formInfo.applystatus == -1){
    alert('请选择审批方式');
    return false;
  }
  return true;
}

 //保存单据
 saveBill(status){
  if(this.doCheckInfo()){
   let saveObj = {
     id:this.formInfo.billId,//单据 id
     type:0,//单据类型
     orderNo:this.formInfo.orderNo,//单据号
     applyDepartId:this.formInfo.staticdataList.user.departmentId, //申请部门id
     remark:this.formInfo.remark,
     amount:this.getAmount(), //单据金额
     approvalType:this.formInfo.applystatus,//审批方式
     tallyDepartId:this.formInfo.departId, //记账部门id
     tallyDepartName:this.getName(1,this.formInfo.departId),
     tallyProjectId:this.formInfo.projectId,//记账项目id
     tallyProjectName:this.getName(2,this.formInfo.projectId),
     status:status,
     travelBooks:this.formInfo.tripList,//行程列表数据-------
     passengerUserIds:this.formInfo.toggerPersonId,
     cashAdvanceBillId:'',
     payType:this.formInfo.advanceObj.advancPayType,
     currencySettleType:this.formInfo.advanceObj.advanceKind,
     receiverDom:this.formInfo.advanceObj.advanceReave,
     bankNo:this.formInfo.advanceObj.bankNo, 
     bankName:this.formInfo.advanceObj.bankName,
     businessTripBillId:'',
     dailyExpenseBillId:'',
     planDate:this._util.getTimestr(new Date()),
     ifAdvance:this.formInfo.ifAdvance,
     ifAll:this.formInfo.ifAllAdvance,
     billIds:'',
     cashAdvanceIds:'',
     applicationCostCudgets:this.formatList(),
     cashPenseMoneys:'',
     amountAdvances:this.formatAdvance(), 
     opentype:3,
     travelbookIds:'',
     applyUserIds:this.formInfo.applyUserIds 
   }
   this._http.post('/bill/newSaveBusinessTrip',saveObj).subscribe(
     result=>{
       alert('保存成功');
       this.closehref=true;
       this.activeModal.close(this.closehref);
       
     }
    )
  }
 }
 //
 dateSelected(data,type,index){
   if(type=='start'){
      this.formInfo.tripList[index].startTime = data;
   }else{
    this.formInfo.tripList[index].endTime = data;
   }
 }

initInto(){
    this.getCurrencyList();
    this.getStaticdata();
    this.getBnakList();
    if(this.openType == 2){
      this.getEditInfo();
    }else{
      this.addTrip();
    }
}
//获取窗口高
heightWin(){
  let _h= document.body.offsetHeight;
  this.windowHeight = (_h-100)+'px';
}
//城市选择显示
cityStatus(x,y,type,i,city){//x距离左边，y距离右边，type:1出发城市，2 到达城市,i第几个行程，city城市名称
  this.cityShow={
    isShow:true,//是否显示选择框
    left:x+'px',//框与左边的距离
    top:y+'px',//框与上面的距离
    type:type,//类型：1出发城市，2到达城市
    index:i,//第i的行程
    city:city //城市名称
  }
}
//子组件数据变化
cityChange(e){
  if(e.type == 1){
    this.formInfo.tripList[e.index].startCity=e.city;
  }else{
    this.formInfo.tripList[e.index].toCity=e.city;
  }

  
}
  ngOnInit() {
    this.initInto();
    this.heightWin();
  }

}
