import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChannelTypeComponent } from './edit-channel-type.component';

describe('EditChannelTypeComponent', () => {
  let component: EditChannelTypeComponent;
  let fixture: ComponentFixture<EditChannelTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditChannelTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChannelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
