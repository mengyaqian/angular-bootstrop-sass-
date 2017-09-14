import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DidiComponent } from './didi.component';

describe('DidiComponent', () => {
  let component: DidiComponent;
  let fixture: ComponentFixture<DidiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DidiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DidiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
