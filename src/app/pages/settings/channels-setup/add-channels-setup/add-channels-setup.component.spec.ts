import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChannelsSetupComponent } from './add-channels-setup.component';

describe('AddChannelsSetupComponent', () => {
  let component: AddChannelsSetupComponent;
  let fixture: ComponentFixture<AddChannelsSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChannelsSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChannelsSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
