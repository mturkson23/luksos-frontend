import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkPeriodConfigComponent } from './edit-work-period-config.component';

describe('EditWorkPeriodConfigComponent', () => {
  let component: EditWorkPeriodConfigComponent;
  let fixture: ComponentFixture<EditWorkPeriodConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkPeriodConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkPeriodConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
