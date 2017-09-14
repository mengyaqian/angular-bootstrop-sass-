import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDateComponent } from './my-date.component';

describe('MyDateComponent', () => {
  let component: MyDateComponent;
  let fixture: ComponentFixture<MyDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
