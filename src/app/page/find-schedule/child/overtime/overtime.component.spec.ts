import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeComponent } from './overtime.component';

describe('OvertimeComponent', () => {
  let component: OvertimeComponent;
  let fixture: ComponentFixture<OvertimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
