import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsSetupComponent } from './channels-setup.component';

describe('ChannelsSetupComponent', () => {
  let component: ChannelsSetupComponent;
  let fixture: ComponentFixture<ChannelsSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelsSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
