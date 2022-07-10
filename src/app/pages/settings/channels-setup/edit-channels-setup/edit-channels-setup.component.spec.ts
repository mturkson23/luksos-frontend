import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChannelsSetupComponent } from './edit-channels-setup.component';

describe('EditChannelsSetupComponent', () => {
  let component: EditChannelsSetupComponent;
  let fixture: ComponentFixture<EditChannelsSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditChannelsSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChannelsSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
