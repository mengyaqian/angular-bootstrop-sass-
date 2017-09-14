import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleChanelModalComponent } from './schedule-chanel-modal.component';

describe('ScheduleChanelModalComponent', () => {
  let component: ScheduleChanelModalComponent;
  let fixture: ComponentFixture<ScheduleChanelModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleChanelModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleChanelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
