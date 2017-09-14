import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatBusinessComponent } from './creat-business.component';

describe('CreatBusinessComponent', () => {
  let component: CreatBusinessComponent;
  let fixture: ComponentFixture<CreatBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
