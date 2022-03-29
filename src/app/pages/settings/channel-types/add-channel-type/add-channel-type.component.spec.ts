import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChannelTypeComponent } from './add-channel-type.component';

describe('AddChannelTypeComponent', () => {
  let component: AddChannelTypeComponent;
  let fixture: ComponentFixture<AddChannelTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChannelTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChannelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
