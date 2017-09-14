import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-schedule',
  templateUrl:'./find-schedule.component.html',
  styleUrls: ['./find-schedule.component.css']
})
export class FindScheduleComponent implements OnInit {
  private barArr:any=[
    {
      name:'日程管理',
      class:'messageNav1',
      href:'',
      check:true,
      child:{
        button:{
          name:'新建日程',
          type:'schedule'
        },
        list:[
          {'name':'我的日程',href:'/index/findSchedule/myDate',check:true},
          {'name':'待确认日程',href:'/index/findSchedule/confirmData'},
          {'name':'同事的日程',href:'/index/findSchedule/ColleagueDate',arr:[],id:'colleague_schedule'},
        ]
      }
    },
    {
      name:'公告',
      class:'noticeAll',
      href:'/index/findSchedule/noticeAll',
      child:{
        button:{
          name:'发布公告',
          type:'notice'
        },
        list:[
          {'name':'全部',href:'/index/findSchedule/noticeAll',check:true},
          {'name':'未读',href:'/index/findSchedule/noticeUnread'},
          {'name':'我发布的',href:'/index/findSchedule/noticeRelease'},
          {'name':'草稿箱',href:'/index/findSchedule/noticeDrafts'},
        ]
      }
    },
    {
      name:'工作报告',
      class:'WorkReport',
      href:'/index/findSchedule/WorkReport',
      child:{
        button:{
          name:'新建工作报告',
          type:'work'
        },
        list:[
          {'name':'我提交的',href:'/index/findSchedule/WorkReport',check:true},
          {'name':'提交给我的',href:'/index/findSchedule/workSubtome'},
          {'name':'提到我的',href:'/index/findSchedule/workMentions'},
          {'name':'草稿箱',href:'/index/findSchedule/workDrafts'},
        ]
      }
    },
    {
      name:'考勤报表',
      class:'attendance',
      href:'/index/findSchedule/reportForms',
      child:{
        topTit:{
          name:'报表'
        },
        list:[
          {'name':'打卡签到报表',href:'/index/findSchedule/reportForms',check:true},
          {'name':'外勤签到报表',href:'/index/findSchedule/reportFormsOutside'},
          {'name':'加班统计报表',href:'/index/findSchedule/leave'},
          {'name':'请假统计报表',href:'/index/findSchedule/overtime'},
          {'name':'假期规则维护',href:'/index/findSchedule/holidayRule'},
          {'name':'年假维护',href:'/index/findSchedule/annualLeave'},
          {'name':'调休维护',href:'/index/findSchedule/offSeting'},
          {'name':'假期余额查询',href:'/index/findSchedule/vacationBalance'},
        ]
      }
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
