import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkReportComponent } from './add-work-report.component';

describe('AddWorkReportComponent', () => {
  let component: AddWorkReportComponent;
  let fixture: ComponentFixture<AddWorkReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
