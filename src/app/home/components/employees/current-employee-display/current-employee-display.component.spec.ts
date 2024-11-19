import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentemployeeDisplayComponent } from './current-employee-display.component';

describe('CurrentemployeeDisplayComponent', () => {
  let component: CurrentemployeeDisplayComponent;
  let fixture: ComponentFixture<CurrentemployeeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentemployeeDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentemployeeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
