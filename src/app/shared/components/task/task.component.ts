import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Task } from '../../../classes/task.class';
import { DataManagerService } from '../../../home/services/data-manager.service';
import { UserSummary } from '../../../classes/user-summary.class';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  dataManager = inject(DataManagerService);

  completedSubtasks: number = 0;
  completedSubtasksPercent: number = 0;

  @Input() task: Task = new Task();
  @Input() nextStatus: string = '';
  @Input() previousStatus: string = '';

  @Output() taskUpdated: EventEmitter<{ task: Task }> = new EventEmitter();

  ngOnInit() {
    this.manageSubtasks();
  }

  /**
   * Updates the completed subtasks count and percentage based on the task's subtasks.
   */

  manageSubtasks() {
    this.completedSubtasks = this.task.subtasks.filter(
      (subtask) => subtask.complete === true
    ).length;

    this.completedSubtasksPercent =
      (this.completedSubtasks / this.task.subtasks.length) * 100;
  }

  /**
   * Checks if the provided value is a UserSummary object.
   * @param user The value to check.
   * @returns Returns true if the value is a UserSummary object, false otherwise.
   */

  isUserSummary(user: number | UserSummary): user is UserSummary {
    return typeof user !== 'number' && user !== null;
  }

  /**
   * Handles changing the status of the task on mobile devices.
   * @param event The event object.
   * @param newStatus The new status of the task.
   */
  changeStatusMobile(event: Event, newStatus: string) {
    event.stopPropagation();
    this.task.status = newStatus;
    this.taskUpdated.emit({ task: this.task });
  }
}
