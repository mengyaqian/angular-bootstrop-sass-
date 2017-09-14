import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFormsOutsideComponent } from './report-forms-outside.component';

describe('ReportFormsOutsideComponent', () => {
  let component: ReportFormsOutsideComponent;
  let fixture: ComponentFixture<ReportFormsOutsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportFormsOutsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFormsOutsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
