import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFormsComponent } from './report-forms.component';

describe('ReportFormsComponent', () => {
  let component: ReportFormsComponent;
  let fixture: ComponentFixture<ReportFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
