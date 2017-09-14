import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  private img:string;
  constructor() { }

  checkPhone(phone){
    if(!(/^[1][47358][0-9]{9}$/.test(phone))){
        return false; 
    }
    return true;
  }
  checkName(name){
    if(!(/^(([\u4e00-\u9fa5]{2,8})|([a-zA-Z]{2,16}))$/).test(name)){
      return false
    }
    return true;
  }
    //获取默认时间
  getTimestr = function(time){
      let t = time ? new Date(time) : new Date();
      let Mon = t.getMonth()+1;
      let Day = t.getDate();
      if(t.getMonth()+1<10){
        this.getTimestr.Mon = '0'+Mon;
      }else{
        this.getTimestr.Mon = Mon;
      }
      if(t.getDate()<10){
        this.getTimestr.Day = '0'+Day;
      }else{
        this.getTimestr.Day = Day;
      }
      return t.getFullYear()+'-'+ this.getTimestr.Mon+ '-' + this.getTimestr.Day+ ' '+ t.getHours()+':'+ t.getMinutes()+':'+ t.getSeconds();
  }
  //判断附件类型
  Enclosuretype(newstr){
    debugger
    var pictype = {
      "jpg" : true,"gif" : true,"png" : true,"bmp" : true
    };
    var audtype = {
      "ogg" : true,"mp3" : true,"wma" : true,
      "wav" : true,"amr" : true,"mpeg" : true
    };
    var vidtype = {
      "ra" : true,"rm" : true,"wmv" : true,
      "asf" : true,"mov" : true,"avi" : true,
      "flv" : true,"f4v" : true,"mkv" : true,
      "mpg" : true,"3gp" : true,"mp4" : true,
      "ram" : true,"rmvb" : true,"navi" : true
    };
    var src = '../../../assets/images/';
    if(newstr.toLowerCase() == "pdf"){
      this.img = src+"acc (1).png";
    }else if(newstr.toLowerCase() == "ppt"){
      this.img = src+"acc (2).png";
    }else if(newstr.toLowerCase() == "xls" || newstr.toLowerCase() == "xlsx"){
      this.img = src+"acc (3).png";
    }else if(newstr.toLowerCase() in vidtype){
      this.img = src+"acc (4).png";
    }else if(newstr.toLowerCase() in pictype){
      this.img = src+"acc (6).png";
    }else if(newstr.toLowerCase() == "txt"){
      this.img = src+"acc (7).png";
    }else if(newstr.toLowerCase() == "rar" || newstr.toLowerCase() == "zip" || newstr.toLowerCase() == "7z"){
      this.img = src+"acc (8).png";
    }else if(newstr.toLowerCase() in audtype){
      this.img = src+"acc (9).png";
    }else if(newstr.toLowerCase() == "doc" || newstr.toLowerCase() == "docx"){
      this.img = src+"acc (10).png";
    }else{
      this.img = src+"acc (5).png";
    }
    return this.img;
  }
  
}
