import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonModalComponent } from './person-modal.component';

describe('PersonModalComponent', () => {
  let component: PersonModalComponent;
  let fixture: ComponentFixture<PersonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
