import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffSetingComponent } from './off-seting.component';

describe('OffSetingComponent', () => {
  let component: OffSetingComponent;
  let fixture: ComponentFixture<OffSetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffSetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffSetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
