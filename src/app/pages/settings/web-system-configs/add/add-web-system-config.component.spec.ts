import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWebSystemConfigsComponent } from './add-web-system-config.component';

describe('AddChannelTypeComponent', () => {
  let component: AddWebSystemConfigsComponent;
  let fixture: ComponentFixture<AddWebSystemConfigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWebSystemConfigsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWebSystemConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
