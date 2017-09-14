import { Routes,RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component'
import {FindPasswordComponent} from './find-password/find-password.component'

import {IndexComponent} from './index/index.component'
import { ApproveComponent,DiscoveryComponent,ExpensesComponent,FindScheduleComponent ,MyDateComponent,ConfirmDataComponent
        ,NoticeUnreadComponent,NoticeReleaseComponent,NoticeAllComponent,NoticeDraftsComponent,WorkReportComponent,WorkSubtomeComponent,WorkMentionsComponent,WorkDraftsComponent,
         HomeComponent,InfotipComponent,MailListComponent,OfficeComponent,SystemManagementComponent,
         TravelBookComponent,WorkCountComponent,BusinessApplyComponent,MyOrderComponent,DidiComponent,
         InformationComponent,WaitDealComponent,RemindComponent,WarningComponent,LeaveComponent,ReportFormsComponent,OvertimeComponent,HolidayRuleComponent,
         AnnualLeaveComponent,OffSetingComponent,VacationBalanceComponent,ReportFormsOutsideComponent} from './page/';
import {AddWorkReportComponent} from './page/find-schedule/'
import { ColleagueDateComponent } from './page/find-schedule/child/colleague-date/colleague-date.component';

import {} from './page/find-schedule/'

export const routes:Routes=[
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
      {
        path: 'login',
        component: LoginComponent
      },

      {
        path: 'find_password',
        component: FindPasswordComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'index',
        component: IndexComponent,
        children:[
            {
                path:'',
                redirectTo:'home',
                pathMatch:'full'
            },
            {
                path:'home',
                component: HomeComponent
            },
            {
                path: 'information',
                component: InformationComponent,
                children:[
                    {
                        path:'information',
                        component:InformationComponent
                    },
                    {
                        path:'waitDeal',
                        component:WaitDealComponent
                    },
                    {
                        path:'remind',
                        component:RemindComponent
                    },
                    {
                        path:'warning',
                        component:WarningComponent
                    }
                ]
            },
            {
                path: 'findSchedule',
                component: FindScheduleComponent,
                children:[
                    {
                        path:'myDate',
                        component: MyDateComponent
                    },
                    {
                        path:'confirmData',
                        component: ConfirmDataComponent
                    },
                    {
                        path:'ColleagueDate',
                        component: ColleagueDateComponent
                    },
                    
                    {
                        path:'noticeAll',
                        component: NoticeAllComponent
                    },
                    {
                        path:'noticeUnread',
                        component: NoticeUnreadComponent
                    },
                    {
                        path:'noticeRelease',
                        component: NoticeReleaseComponent
                    },
                    {
                        path:'noticeDrafts',
                        component: NoticeDraftsComponent
                    },
                    {
                        path:'WorkReport',
                        component: WorkReportComponent
                    },
                    {
                        path:'workSubtome',
                        component: WorkSubtomeComponent
                    },
                    {
                        path:'workMentions',
                        component: WorkMentionsComponent
                    },
                    {
                        path:'workDrafts',
                        component: WorkDraftsComponent
                    },
                    {
                        path:'leave',
                        component: LeaveComponent
                    },
                    {
                        path:'reportForms',
                        component: ReportFormsComponent
                    },
                    {
                        path:'reportFormsOutside',
                        component: ReportFormsOutsideComponent
                    },
                    {
                        path:'overtime',
                        component: OvertimeComponent
                    },
                    {
                        path:'holidayRule',
                        component: HolidayRuleComponent
                    },
                    {
                        path:'annualLeave',
                        component: AnnualLeaveComponent
                    },
                    {
                        path:'offSeting',
                        component: OffSetingComponent
                    },
                    {
                        path:'vacationBalance',
                        component: VacationBalanceComponent
                    },
                    {
                        path:'addWorkReport',
                        component: AddWorkReportComponent
                    }
                ]
            },
            {
                path: 'infotip',
                component: InfotipComponent,
                children:[
                ]
            },
            {
                path: 'office',
                component: OfficeComponent,
                children:[
                ]
            },
            {
                path: 'travelBook',
                component: TravelBookComponent,
                children:[
                    {
                        path:'businessApply',
                        component:BusinessApplyComponent
                    },
                    {   
                        path:'myOrder',
                        component:MyOrderComponent
                    },
                    {   
                        path:'didi',
                        component:DidiComponent
                    }
                ]
            },
            {
                path: 'expenses',
                component: ExpensesComponent,
                children:[
                ]
            },
            {
                path: 'approve',
                component: ApproveComponent,
                children:[
                ]
            },
            {
                path: 'work_count',
                component: WorkCountComponent,
                children:[
                ]
            },
            {
                path: 'mail_list',
                component: MailListComponent,
                children:[
                ]
            },
            {
                path: 'discovery',
                component: DiscoveryComponent,
                children:[
                ]
            },
            {
                path: 'system_management',
                component: SystemManagementComponent,
                children:[
                ]
            }

            
        ]
      }
]

export const routing=RouterModule.forRoot(routes,{useHash:false});