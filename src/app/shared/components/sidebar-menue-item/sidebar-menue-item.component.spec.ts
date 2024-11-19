import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMenueItemComponent } from './sidebar-menue-item.component';

describe('SidebarMenueItemComponent', () => {
  let component: SidebarMenueItemComponent;
  let fixture: ComponentFixture<SidebarMenueItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMenueItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarMenueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
