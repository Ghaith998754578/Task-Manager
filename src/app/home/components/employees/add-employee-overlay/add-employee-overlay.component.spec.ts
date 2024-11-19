import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddemployeeOverlayComponent } from './add-employee-overlay.component';

describe('AddemployeeOverlayComponent', () => {
  let component: AddemployeeOverlayComponent;
  let fixture: ComponentFixture<AddemployeeOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddemployeeOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddemployeeOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
