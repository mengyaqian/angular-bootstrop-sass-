import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBusinessComponent } from './detail-business.component';

describe('DetailBusinessComponent', () => {
  let component: DetailBusinessComponent;
  let fixture: ComponentFixture<DetailBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
