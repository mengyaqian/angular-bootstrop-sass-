import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDetailModalComponent } from './schedule-detail-modal.component';

describe('ScheduleDetailModalComponent', () => {
  let component: ScheduleDetailModalComponent;
  let fixture: ComponentFixture<ScheduleDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
