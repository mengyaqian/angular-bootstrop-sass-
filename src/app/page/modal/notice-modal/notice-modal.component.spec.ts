import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeModalComponent } from './notice-modal.component';

describe('NoticeModalComponent', () => {
  let component: NoticeModalComponent;
  let fixture: ComponentFixture<NoticeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
