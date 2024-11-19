import { Component } from '@angular/core';

import { SidebarMenueItemComponent } from '../sidebar-menue-item/sidebar-menue-item.component';

@Component({
  selector: 'app-nav-footer',
  standalone: true,
  imports: [SidebarMenueItemComponent],
  templateUrl: './nav-footer.component.html',
  styleUrl: './nav-footer.component.scss',
})
export class NavFooterComponent {}
