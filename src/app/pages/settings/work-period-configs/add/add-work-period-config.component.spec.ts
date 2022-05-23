import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkPeriodConfigComponent } from './add-work-period-config.component';

describe('AddWorkPeriodConfigComponent', () => {
  let component: AddWorkPeriodConfigComponent;
  let fixture: ComponentFixture<AddWorkPeriodConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkPeriodConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkPeriodConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
