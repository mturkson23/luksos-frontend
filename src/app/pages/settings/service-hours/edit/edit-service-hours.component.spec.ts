import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceHoursComponent } from './edit-service-hours.component';

describe('EditServiceHoursComponent', () => {
  let component: EditServiceHoursComponent;
  let fixture: ComponentFixture<EditServiceHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditServiceHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditServiceHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
