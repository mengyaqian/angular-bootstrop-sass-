import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitDealComponent } from './wait-deal.component';

describe('WaitDealComponent', () => {
  let component: WaitDealComponent;
  let fixture: ComponentFixture<WaitDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
