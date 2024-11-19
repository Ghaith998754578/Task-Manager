import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Task } from '../../../../classes/task.class';
import { Subtask } from '../../../../classes/subtask.class';
import { DataManagerService } from '../../../services/data-manager.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-overlay.component.html',
  styleUrl: './task-overlay.component.scss',
})
export class TaskOverlayComponent {
  dataManger = inject(DataManagerService);

  @Input() task: Task = new Task();

  @Output() closeOverlay: EventEmitter<void> = new EventEmitter<void>();
  @Output() openEditOverlay: EventEmitter<{ task: Task }> = new EventEmitter();
  @Output() updateSubtask: EventEmitter<{ task: Task }> = new EventEmitter();

  /**
   * Emits the close overlay event.
   */
  onCloseOverlay() {
    this.closeOverlay.emit();
  }

  /**
   * Opens the edit task overlay and closes the current overlay.
   */
  openEditTaskOverlay() {
    this.closeOverlay.emit();
    this.openEditOverlay.emit({ task: this.task });
  }

  /**
   * Toggles the completion status of a subtask and emits an update event.
   *
   * @param subtask The subtask to update.
   */
  updateTask(subtask: Subtask) {
    subtask.complete = !subtask.complete;

    this.updateSubtask.emit({ task: this.task });
  }

  /**
   * Deletes the task from the server and updates the tasks list.
   * Also emits the close overlay event.
   */
  async deleteTask() {
    try {
      await this.dataManger.deleteTask(this.task);

      const index = this.dataManger
        .tasksSignal()
        .findIndex((task) => task.id === this.task.id);

      if (index !== -1) {
        this.dataManger.tasksSignal.update((value) =>
          value.filter((task, idx) => idx !== index)
        );
      }

      this.onCloseOverlay();
    } catch (err) {
      console.error(err);
    }
  }
}
