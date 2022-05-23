import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWebSystemConfigsComponent } from './edit-web-system-config.component';

describe('EditWebSystemConfigsComponent', () => {
  let component: EditWebSystemConfigsComponent;
  let fixture: ComponentFixture<EditWebSystemConfigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWebSystemConfigsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWebSystemConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
