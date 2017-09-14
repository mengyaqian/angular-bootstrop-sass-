import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCountComponent } from './work-count.component';

describe('WorkCountComponent', () => {
  let component: WorkCountComponent;
  let fixture: ComponentFixture<WorkCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
