import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { DataManagerService } from '../../services/data-manager.service';
import { employeeComponent } from './employee/employee.component';
import { ButtonWithIconComponent } from '../../../shared/components/buttons/button-with-icon/button-with-icon.component';
import { employee } from '../../../classes/employee.class';
import { CurrentemployeeDisplayComponent } from './current-employee-display/current-employee-display.component';
import { AddemployeeOverlayComponent } from './add-employee-overlay/add-employee-overlay.component';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    employeeComponent,
    ButtonWithIconComponent,
    CurrentemployeeDisplayComponent,
    AddemployeeOverlayComponent,
    AddTaskComponent,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class employeesComponent {
  public currentemployee: employee | null = new employee();
  public initials: string[] = [];
  public addemployeeOverlayOpen: boolean = false;
  public addemployeeOverlayAnimation: boolean = false;
  public editemployeeOverlayOpen: boolean = false;
  public editemployeeOverlayAnimation: boolean = false;
  public addTaskOverlayOpen: boolean = false;
  public addTaskOverlayAnimation: boolean = false;

  public dataManager = inject(DataManagerService);

  @ViewChild('currentemployeeDiv') currentemployeeRef!: ElementRef;

  constructor() {}

  ngOnInit() {
    this.getUniqueInitials();
  }

  /**
   * Retrieves unique initials from user employees and sorts them.
   */
  getUniqueInitials() {
    this.initials = [];
    const initialsSet = new Set<string>();
    this.dataManager.useremployees?.forEach((employee) => {
      const initial = employee.name.charAt(0).toUpperCase();
      initialsSet.add(initial);
    });
    this.initials = Array.from(initialsSet).sort();
  }

  /**
   * Toggles the add employee modal.
   * @param action - Action to perform ('open' or 'close').
   * @param event - Optional event data.
   */
  toggleAddemployeeModal(
    action: string,
    event?: { action: boolean; delete: boolean; id: number }
  ) {
    if (action === 'open') {
      this.handleOverlayAnimation('open', 'add', 400);
    } else if (action === 'close') {
      if (event?.action) this.focusCreatedemployee(event.id);
      this.getUniqueInitials();
      this.handleOverlayAnimation('close', 'add', 400);
    }
  }

  /**
   * Focuses on the created employee after closing the add employee modal.
   * @param id - ID of the created employee.
   */
  focusCreatedemployee(id: number) {
    const employee = this.dataManager.useremployees?.find((employee) => {
      return employee.id === id;
    });
    if (employee) this.toggleemployee(employee);
  }

  /**
   * Toggles the edit employee modal.
   * @param action - Action to perform ('open' or 'close').
   * @param event - Optional event data.
   */
  toggleEditemployeeModal(
    action: string,
    event?: { action: boolean; delete: boolean; id: number }
  ) {
    if (action === 'open') {
      this.handleOverlayAnimation('open', 'edit', 400);
    } else if (action === 'close') {
      if (event?.delete) this.handleDeleteemployee(event.id);
      this.getUniqueInitials();
      this.handleOverlayAnimation('close', 'edit', 400);
    }
  }

  /**
   * Handles the deletion of a employee.
   * @param id - ID of the employee to delete.
   */
  handleDeleteemployee(id: number) {
    this.currentemployee = null;
    const index = this.dataManager.useremployees?.findIndex((employee) => {
      return employee.id === id;
    });
    if (index !== undefined && index !== -1) {
      this.dataManager.useremployees?.splice(index, 1);
      localStorage.setItem(
        'employees',
        JSON.stringify(this.dataManager.useremployees)
      );
    }
  }

  /**
   * Toggles the add task overlay.
   * @param action - Action to perform ('open' or 'close').
   */
  toggleAddTaskOverlay(action: string) {
    if (action === 'open') {
      this.handleOverlayAnimation('open', 'addTask', 400);
    } else if (action === 'close') {
      this.handleOverlayAnimation('close', 'addTask', 400);
    }
  }

  /**
   * Handles overlay animation.
   * @param action - Action to perform ('open' or 'close').
   * @param overlay - Type of overlay ('edit', 'add', 'addTask').
   * @param animationTime - Duration of animation in milliseconds.
   */
  handleOverlayAnimation(
    action: string,
    overlay: string,
    animationTime: number
  ) {
    switch (overlay) {
      case 'edit':
        if (action === 'open') {
          this.editemployeeOverlayOpen = true;
          setTimeout(() => {
            this.editemployeeOverlayAnimation = true;
          }, 100);
        } else if (action === 'close') {
          this.editemployeeOverlayAnimation = false;
          setTimeout(() => {
            this.editemployeeOverlayOpen = false;
          }, animationTime);
        }
        break;
      case 'add':
        if (action === 'open') {
          this.addemployeeOverlayOpen = true;
          setTimeout(() => {
            this.addemployeeOverlayAnimation = true;
          }, 100);
        } else if (action === 'close') {
          this.addemployeeOverlayAnimation = false;
          setTimeout(() => {
            this.addemployeeOverlayOpen = false;
          }, animationTime);
        }
        break;
      case 'addTask':
        if (action === 'open') {
          this.addTaskOverlayOpen = true;
          setTimeout(() => {
            this.addTaskOverlayAnimation = true;
          }, 100);
        } else if (action === 'close') {
          this.addTaskOverlayAnimation = false;
          setTimeout(() => {
            this.addTaskOverlayOpen = false;
          }, animationTime);
        }
        break;
      default:
        console.error(`Unbekanntes Overlay: ${overlay}`);
        break;
    }
  }

  /**
   * Toggles the display of a employee and applies animation if specified.
   * @param employee - The employee to toggle.
   */

  toggleemployee(employee?: employee) {
    const currentemployeeElement: HTMLElement =
      this.currentemployeeRef.nativeElement;

    if (employee) {
      this.currentemployee = employee;
      currentemployeeElement.classList.add('current-employee-animation');
    } else currentemployeeElement.classList.remove('current-employee-animation');
  }
}
