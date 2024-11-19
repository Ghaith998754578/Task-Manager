import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWoIconComponent } from './button-wo-icon.component';

describe('ButtonWoIconComponent', () => {
  let component: ButtonWoIconComponent;
  let fixture: ComponentFixture<ButtonWoIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonWoIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonWoIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
