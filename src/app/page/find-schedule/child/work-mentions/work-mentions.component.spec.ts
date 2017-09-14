import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkMentionsComponent } from './work-mentions.component';

describe('WorkMentionsComponent', () => {
  let component: WorkMentionsComponent;
  let fixture: ComponentFixture<WorkMentionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkMentionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkMentionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
