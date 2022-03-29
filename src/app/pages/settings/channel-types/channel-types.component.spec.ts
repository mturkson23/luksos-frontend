import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelTypesComponent } from './channel-types.component';

describe('ChannelTypesComponent', () => {
  let component: ChannelTypesComponent;
  let fixture: ComponentFixture<ChannelTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
