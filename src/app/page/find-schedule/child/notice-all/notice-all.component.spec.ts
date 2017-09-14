import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeAllComponent } from './notice-all.component';

describe('NoticeAllComponent', () => {
  let component: NoticeAllComponent;
  let fixture: ComponentFixture<NoticeAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
