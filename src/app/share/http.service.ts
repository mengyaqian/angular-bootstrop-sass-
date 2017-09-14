import { Injectable } from '@angular/core';
import {Http,RequestOptions,Headers,Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class HttpService {
  baseUrl:string= 'https://uat.feikongbao.com/yodooweb/';
  constructor(public _http:Http) { }
  public loadStatus:boolean;
  get(url:string,params:any):Observable<any>{
      this.loadStatus=true;
      let headers = new Headers({ "Accept": "application/json" });
      let options = new RequestOptions({ headers: headers, search: params });
      return this._http.get('http://10.0.0.14:8080/yodooweb'+url,options)
                .map((res :Response)=>{
                  this.loadStatus=false;
                  console.log(JSON.parse(res['_body'])); 
                  return JSON.parse(res['_body']);
                })
                .catch(this.handleError)
  }

  post(url:string,params:any):Observable<any>{
      this.loadStatus=true;
      let body = JSON.stringify(params);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({headers: headers});
      return this._http.post('http://10.0.0.14:8080/yodooweb'+url,body,options)
                .map((res :Response)=>{
                  this.loadStatus=false;
                  if(typeof(res['_body']) == 'string'){
                    console.log(JSON.parse(res['_body'])); 
                    return JSON.parse(res['_body']);
                  }else{
                    console.log(res['_body']); 
                    return res['_body'];
                  }
                  
                })
                .catch(this.handleError)
  }

  postForm(url:string,params:any):Observable<any>{
      this.loadStatus=true;
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
      let options = new RequestOptions({headers: headers});
      let index:number=0;
      let body:string='';
      for(let p in params){
        if(index!=0)
          body+='&'
        body+=p+'='+params[p]
        index++;
      }
      
      return this._http.post('http://10.0.0.14:8080/yodooweb'+url,body,options)
                .map((res :Response)=>{
                  this.loadStatus=false;
                  if(typeof(res['_body']) == 'string'){
                    console.log(JSON.parse(res['_body'])); 
                    return JSON.parse(res['_body']);
                  }else{
                    console.log(res['_body']); 
                    return res['_body'];
                  }
                })
                .catch(this.handleError)
  }

  handleError(error:any){
    console.error(error);
    return Promise.reject(error)
  }
   



}
