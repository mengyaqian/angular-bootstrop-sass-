import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemManagementComponent } from './system-management.component';

describe('SystemManagementComponent', () => {
  let component: SystemManagementComponent;
  let fixture: ComponentFixture<SystemManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
