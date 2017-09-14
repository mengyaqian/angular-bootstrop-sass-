import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  constructor() { }
  public selectDate:string;
  public scheduleData:any;
  public scheduleListData:any;
  public userInfo:any={
    orgId:1019,
    userId:8168
  }
  

  setDate(date,type,num){
      let Dates = new Date(date);
      if(type=='month')
        Dates.setMonth(Dates.getMonth()+num)
      else if(type=='year')
        Dates.setFullYear(Dates.getFullYear()+num)
      else
        Dates.setDate(Dates.getDate()+num)

      let year: number = Dates.getFullYear();
      let month: any =  Dates.getMonth() + 1;
      if (month >= 1 && month <= 9)
        month = "0" + month;
      let day: any = Dates.getDate();
      if (day >= 0 && day <= 9)
        day = "0" + day;

    return  year + '-' + month + '-' + day;
  }

  getDate(type):string{
      let Dates = new Date();
      let year: number = Dates.getFullYear();
      let month: any =  Dates.getMonth() + 1;
      if (month >= 1 && month <= 9)
        month = "0" + month;
      let day: any = Dates.getDate();
      if (day >= 0 && day <= 9)
        day = "0" + day;

      if(type=='date')
        return  year + '-' + month + '-' + day;
      else if(type=='hour')
        return  Dates.getHours() + ':' + 
                Dates.getMinutes()+':'+
                Dates.getSeconds();
      else if(type=='day'){
        let week:string;
        switch(Dates.getDay()){
          case 0 : week='星期日';break;
          case 1 : week='星期一';break;
          case 2 : week='星期二';break;
          case 3 : week='星期三';break;
          case 4 : week='星期四';break;
          case 5 : week='星期五';break;
          case 6 : week='星期六';break;
        }
        return week;
      }
      else
        return  year + '-' + month + '-' + day +' '+
                Dates.getHours() + ':' + 
                Dates.getMinutes()+':'+
                Dates.getSeconds();
  }

  arrRemove(arr,val){
    var index = arr.indexOf(val);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }

}
