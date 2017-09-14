import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayRuleComponent } from './holiday-rule.component';

describe('HolidayRuleComponent', () => {
  let component: HolidayRuleComponent;
  let fixture: ComponentFixture<HolidayRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
