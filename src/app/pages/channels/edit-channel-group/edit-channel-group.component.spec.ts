import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChannelGroupComponent } from './edit-channel-group.component';

describe('EditChannelGroupComponent', () => {
  let component: EditChannelGroupComponent;
  let fixture: ComponentFixture<EditChannelGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditChannelGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChannelGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
