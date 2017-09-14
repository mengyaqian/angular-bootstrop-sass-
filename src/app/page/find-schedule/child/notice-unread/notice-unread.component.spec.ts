import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeUnreadComponent } from './notice-unread.component';

describe('NoticeUnreadComponent', () => {
  let component: NoticeUnreadComponent;
  let fixture: ComponentFixture<NoticeUnreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeUnreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeUnreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
