import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeReleaseComponent } from './notice-release.component';

describe('NoticeReleaseComponent', () => {
  let component: NoticeReleaseComponent;
  let fixture: ComponentFixture<NoticeReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
