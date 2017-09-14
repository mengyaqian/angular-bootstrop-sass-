import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationBalanceComponent } from './vacation-balance.component';

describe('VacationBalanceComponent', () => {
  let component: VacationBalanceComponent;
  let fixture: ComponentFixture<VacationBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
