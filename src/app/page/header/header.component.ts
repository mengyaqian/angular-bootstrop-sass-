import { Component, OnInit ,Output,Injectable} from '@angular/core';
import { Router} from '@angular/router'
import {HttpService} from '../../share/http.service'

@Component({
  selector: 'nav-tittle',
  templateUrl:'./header.component.html',
  styleUrls:['./header.component.css'],
  outputs:['outputValue']
})
@Injectable()
export class HeaderComponent implements OnInit {
  private tittleArr:any=[
    {
      desc:"消息",
      id:"infotip",
      href:"/index/information"
    },
    {
      desc:"协同办公",
      id:"office",
      href:"/index/findSchedule"
    },
    {
      desc:"差旅管理",
      id:"travelBook",
      href:"/index/travelBook"
    },
    {
      desc:"费用报销",
      id:"expenses",
      href:""
    },
    {
      desc:"审批",
      id:"approve",
      href:""
    },
    {
      desc:"系统管理",
      id:"system_management",
      href:"/jumpPage?operate=user"
    }
  ];
  private userInfo:any={
    users:[{}]
  };
  constructor(private _router:Router,private _http:HttpService) { 
  }

  ngOnInit() {
    this._http.postForm('/web/actionChatUser',{ifAll:1}).subscribe(res=> {
        this.userInfo=res.content[0]; 
        console.log(this.userInfo.users[0])
    });
  }

  tittlePevent(){
    event.preventDefault();
  }

  tittleClick(obj) :void{
    this._router.navigate([obj.href]);
  }

  ad(){
    alert(1);
  }

}
