import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBookedComponent } from './form-booked.component';

describe('FormBookedComponent', () => {
  let component: FormBookedComponent;
  let fixture: ComponentFixture<FormBookedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBookedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
