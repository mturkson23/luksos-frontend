import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSystemConfigsComponent } from './web-system-configs.component';

describe('WebSystemConfigsComponent', () => {
  let component: WebSystemConfigsComponent;
  let fixture: ComponentFixture<WebSystemConfigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebSystemConfigsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebSystemConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
