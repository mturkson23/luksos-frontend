import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPeriodConfigComponent } from './work-period-configs.component';

describe('WorkPeriodConfigComponent', () => {
  let component: WorkPeriodConfigComponent;
  let fixture: ComponentFixture<WorkPeriodConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPeriodConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPeriodConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
