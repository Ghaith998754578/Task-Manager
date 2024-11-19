import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { DataManagerService } from '../../services/data-manager.service';
import { NavFooterComponent } from '../../../shared/components/nav-footer/nav-footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    NavFooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  todos: any;

  dataManger = inject(DataManagerService);

  ngOnInit() {
    this.getData();
  }

  /**
   * Retrieves user and task data from the DataManager asynchronously.
   */
  async getData() {
    await this.dataManger.getUsers();
    await this.dataManger.getTasks();
  }
}
