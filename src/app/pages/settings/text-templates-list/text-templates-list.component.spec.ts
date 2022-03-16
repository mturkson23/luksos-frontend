import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTemplatesListComponent } from './text-templates-list.component';

describe('TextTemplatesListComponent', () => {
  let component: TextTemplatesListComponent;
  let fixture: ComponentFixture<TextTemplatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextTemplatesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextTemplatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
