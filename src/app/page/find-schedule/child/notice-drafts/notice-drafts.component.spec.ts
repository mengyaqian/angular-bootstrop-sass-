import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeDraftsComponent } from './notice-drafts.component';

describe('NoticeDraftsComponent', () => {
  let component: NoticeDraftsComponent;
  let fixture: ComponentFixture<NoticeDraftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeDraftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeDraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
