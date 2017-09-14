import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindScheduleComponent } from './find-schedule.component';

describe('FindScheduleComponent', () => {
  let component: FindScheduleComponent;
  let fixture: ComponentFixture<FindScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
