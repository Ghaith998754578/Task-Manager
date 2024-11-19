import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonWoIconComponent } from '../../../shared/components/buttons/button-wo-icon/button-wo-icon.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-base',
  standalone: true,
  imports: [CommonModule, ButtonWoIconComponent, RouterModule],
  templateUrl: './auth-base.component.html',
  styleUrl: './auth-base.component.scss',
})
export class AuthBaseComponent {
  hideLogo: boolean = false;

  public router = inject(Router);

  constructor() {}

  ngOnInit() {
    if (this.router.url === '/login') {
      this.hideLogo = true;

      setTimeout(() => {
        this.hideLogo = false;
      }, 750);
    }
  }
}