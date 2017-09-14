import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelBookComponent } from './travel-book.component';

describe('TravelBookComponent', () => {
  let component: TravelBookComponent;
  let fixture: ComponentFixture<TravelBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
