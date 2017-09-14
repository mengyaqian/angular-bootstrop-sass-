import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkDraftsComponent } from './work-drafts.component';

describe('WorkDraftsComponent', () => {
  let component: WorkDraftsComponent;
  let fixture: ComponentFixture<WorkDraftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkDraftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkDraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
