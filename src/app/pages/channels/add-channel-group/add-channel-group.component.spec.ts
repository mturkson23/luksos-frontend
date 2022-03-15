import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChannelGroupComponent } from './add-channel-group.component';

describe('AddChannelGroupComponent', () => {
  let component: AddChannelGroupComponent;
  let fixture: ComponentFixture<AddChannelGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChannelGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChannelGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
