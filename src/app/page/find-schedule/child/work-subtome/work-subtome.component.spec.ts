import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSubtomeComponent } from './work-subtome.component';

describe('WorkSubtomeComponent', () => {
  let component: WorkSubtomeComponent;
  let fixture: ComponentFixture<WorkSubtomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkSubtomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSubtomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
