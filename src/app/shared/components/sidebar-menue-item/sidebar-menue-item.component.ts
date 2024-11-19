import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-menue-item',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar-menue-item.component.html',
  styleUrl: './sidebar-menue-item.component.scss',
})
export class SidebarMenueItemComponent {
  @Input() content: string = '';
  @Input() imgSrc: string = '';
  @Input() routerTarget: string = '';
}
