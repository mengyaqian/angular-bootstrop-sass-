import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleListModalComponent } from './schedule-list-modal.component';

describe('ScheduleListModalComponent', () => {
  let component: ScheduleListModalComponent;
  let fixture: ComponentFixture<ScheduleListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
