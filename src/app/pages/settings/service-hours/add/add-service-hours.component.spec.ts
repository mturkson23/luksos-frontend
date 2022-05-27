import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceHoursComponent } from './add-service-hours.component';

describe('AddServiceHoursComponent', () => {
  let component: AddServiceHoursComponent;
  let fixture: ComponentFixture<AddServiceHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServiceHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
