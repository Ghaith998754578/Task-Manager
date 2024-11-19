import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { employee } from '../../../../classes/employee.class';
import { ButtonWithIconComponent } from '../../../../shared/components/buttons/button-with-icon/button-with-icon.component';

@Component({
  selector: 'app-current-employee-display',
  standalone: true,
  imports: [ButtonWithIconComponent],
  templateUrl: './current-employee-display.component.html',
  styleUrl: './current-employee-display.component.scss',
})
export class CurrentemployeeDisplayComponent {
  @Input() currentemployee: employee = new employee();
  @Output() openAddTaskEvent: EventEmitter<void> = new EventEmitter();
  @Output() openEditemployeeEvent: EventEmitter<void> = new EventEmitter();
  @Output() deleteemployeeEvent: EventEmitter<{
    action: boolean;
    delete: boolean;
    id: number;
  }> = new EventEmitter<{ action: boolean; delete: boolean; id: number }>();

  /**
   * Emits an event to open the add task overlay.
   */
  emitOpenAddTask() {
    this.openAddTaskEvent.emit();
  }

  /**
   * Emits an event to open the edit employee overlay.
   */
  emitEditemployee() {
    this.openEditemployeeEvent.emit();
  }

  /**
   * Emits an event to delete the employee and informs about the deletion.
   */
  async deleteemployeeMobile() {
    this.deleteemployeeEvent.emit({
      action: true,
      delete: true,
      id: this.currentemployee.id,
    });
  }
}
