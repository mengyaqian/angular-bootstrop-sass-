import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing} from './app.router'

import { NgbModule ,NgbDatepickerModule,NgbPaginationModule,NgbTimepickerModule,NgbTooltipModule,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule as Ng2Charts} from 'ng2-charts'

import {UtilService} from './share/util.service';
import {HttpService} from './share/http.service'
import {CommonService} from './share/common.service';

import { AppComponent } from './app.component';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FindPasswordComponent } from './find-password/find-password.component'
import {IndexComponent} from './index/index.component'

import {HeaderComponent,BarComponent,HomeComponent,FindScheduleComponent,MyDateComponent,InfotipComponent,
        OfficeComponent,TravelBookComponent,ExpensesComponent,ApproveComponent,WorkCountComponent,MailListComponent,
        DiscoveryComponent,SystemManagementComponent,BusinessApplyComponent,WaitDealComponent,LeaveComponent,ReportFormsComponent,OvertimeComponent,HolidayRuleComponent,
        AnnualLeaveComponent,OffSetingComponent,VacationBalanceComponent,ReportFormsOutsideComponent,SignDataComponent} from './page/';
import { MyOrderComponent } from './page/travel-book/child/my-order/my-order.component';
import { InformationComponent } from './page/information/information.component';
import { RemindComponent } from './page/information/child/remind/remind.component';
import { WarningComponent } from './page/information/child/warning/warning.component';
import { ImageSrcPipe } from './page/information/child/remind/image-src.pipe';
import { DidiComponent } from './page/travel-book/child/didi/didi.component';
import { ListMoneyFormatPipe,ListAuditStatusPipe,CitySearchPipe,PayTypePipe,ApproveFlowPipe,SignPipe } from './share/pipe';
import { NoticeUnreadComponent } from './page/find-schedule/child/notice-unread/notice-unread.component';
import { NoticeReleaseComponent } from './page/find-schedule/child/notice-release/notice-release.component';
import { NoticeAllComponent } from './page/find-schedule/child/notice-all/notice-all.component';
import { NoticeDraftsComponent } from './page/find-schedule/child/notice-drafts/notice-drafts.component';
import { WorkSubtomeComponent } from './page/find-schedule/child/work-subtome/work-subtome.component';
import { WorkMentionsComponent } from './page/find-schedule/child/work-mentions/work-mentions.component';
import { WorkDraftsComponent } from './page/find-schedule/child/work-drafts/work-drafts.component';
import { WorkImgPipe } from './page/find-schedule/child/work-report/work-img.pipe';
import { WorkReportComponent } from './page/find-schedule/child/work-report/work-report.component';
import {CreatBusinessComponent} from './page/modal/creat-business/creat-business.component';
import { ConfirmDataComponent } from './page/find-schedule/child/confirm-data/confirm-data.component';

import { DateDirectiveDirective } from './share/date-directive.directive';
import { ConfirmComponent } from './page/find-schedule/child/confirm/confirm.component';
import { DateComponent } from './page/date/date.component';
import { ScheduleModalComponent } from './page/modal/schedule-modal/schedule-modal.component';
import { PersonModalComponent } from './page/modal/person-modal/person-modal.component';
import { ScheduleDetailModalComponent } from './page/modal/schedule-detail-modal/schedule-detail-modal.component';
import { ScheduleListModalComponent } from './page/modal/schedule-list-modal/schedule-list-modal.component';
import { ScheduleChanelModalComponent } from './page/modal/schedule-chanel-modal/schedule-chanel-modal.component';
import { NoticeModalComponent } from './page/modal/notice-modal/notice-modal.component';
import { BillListComponent } from './page/expenses/child/bill-list/bill-list.component';
import { NumberToCharPipe } from './share/pipe/number-to-char.pipe';
import { AddWorkReportComponent } from './page/find-schedule/child/add-work-report/add-work-report.component';
import { ColleagueDateComponent } from './page/find-schedule/child/colleague-date/colleague-date.component';
import { SelectCityComponent } from './page/modal/creat-business/select-city/select-city.component';
import { DetailBusinessComponent } from './page/modal/detail-business/detail-business.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    HeaderComponent,
    BarComponent,
    RegisterComponent,
    FindPasswordComponent,
    HomeComponent,
    FindScheduleComponent,
    MyDateComponent,
    InfotipComponent,
    OfficeComponent,
    TravelBookComponent,
    ExpensesComponent,
    ApproveComponent,
    WorkCountComponent,
    MailListComponent,
    DiscoveryComponent,
    SystemManagementComponent,
    BusinessApplyComponent,
    MyOrderComponent,
    InformationComponent,
    WaitDealComponent,
    RemindComponent,
    WarningComponent,
    ImageSrcPipe,
    DidiComponent,
    ListMoneyFormatPipe,
    ListAuditStatusPipe,
    DateDirectiveDirective,
    ConfirmComponent,
    DateComponent,
    ScheduleModalComponent,
    PersonModalComponent,
    CreatBusinessComponent,    
    NoticeUnreadComponent,
    NoticeReleaseComponent,
    NoticeAllComponent,
  NoticeDraftsComponent,
    WorkReportComponent,
    WorkSubtomeComponent,
    WorkMentionsComponent,
    WorkDraftsComponent,
    WorkImgPipe,
LeaveComponent,
    ReportFormsComponent,
    OvertimeComponent,
    HolidayRuleComponent,
    AnnualLeaveComponent,
    OffSetingComponent,
    VacationBalanceComponent,
    ReportFormsOutsideComponent,
    ScheduleDetailModalComponent,
    ScheduleListModalComponent,
    ScheduleChanelModalComponent,
    ConfirmDataComponent,
    NoticeModalComponent,
    BillListComponent,
    NumberToCharPipe,
    AddWorkReportComponent,
    ColleagueDateComponent,
    SelectCityComponent,
    CitySearchPipe,
    DetailBusinessComponent,
    PayTypePipe,
    ApproveFlowPipe,
    SignDataComponent,
    SignPipe
  ],  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2Charts,
    NgbModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    NgbPaginationModule.forRoot(),
  ],
  providers: [UtilService,HttpService,CommonService,NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [
        ScheduleModalComponent,
        PersonModalComponent,
        CreatBusinessComponent,
        ScheduleDetailModalComponent,
        ScheduleListModalComponent,
        ScheduleChanelModalComponent,
        NoticeModalComponent,
        DetailBusinessComponent]

})
export class AppModule { }
