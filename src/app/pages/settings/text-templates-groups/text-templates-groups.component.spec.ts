import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTemplatesGroupsComponent } from './text-templates-groups.component';

describe('TextTemplatesGroupsComponent', () => {
  let component: TextTemplatesGroupsComponent;
  let fixture: ComponentFixture<TextTemplatesGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextTemplatesGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextTemplatesGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
