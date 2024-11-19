import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskOverlayComponent } from './edit-task-overlay.component';

describe('EditTaskOverlayComponent', () => {
  let component: EditTaskOverlayComponent;
  let fixture: ComponentFixture<EditTaskOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTaskOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTaskOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
