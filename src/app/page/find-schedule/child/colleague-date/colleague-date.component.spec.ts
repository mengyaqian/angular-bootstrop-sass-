import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColleagueDateComponent } from './colleague-date.component';

describe('ColleagueDateComponent', () => {
  let component: ColleagueDateComponent;
  let fixture: ComponentFixture<ColleagueDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColleagueDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColleagueDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
