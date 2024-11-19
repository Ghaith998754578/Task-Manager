import { Component, effect, inject, signal } from '@angular/core';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { DataManagerService } from '../../services/data-manager.service';
import { Task } from '../../../classes/task.class';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [SummaryCardComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  tasksInBoard: number = 0;
  tasksInProgress: number = 0;
  
  tasksToDo: number = 0;
  TasksDone: number = 0;
  highPrioTasks: number = 0;

  public dataManager = inject(DataManagerService);

  constructor() {
    effect(() => this.updateCounts(this.dataManager.tasksSignal()));
  }

  /**
   * Generates a greeting based on the current time of the day.
   * @returns A string containing the appropriate greeting.
   */
  getGreeting(): string {
    const currentHour = new Date().getHours();

    if (currentHour < 12) return 'Good morning, ';
    else if (currentHour < 18) return 'Good afternoon, ';
    else return 'Good evening, ';
  }

  /**
   * Updates the counts of tasks in different statuses and with different priorities.
   * @param tasks An array of tasks to be counted.
   */
  updateCounts(tasks: Task[]) {
    this.tasksInBoard = tasks.length;

    const statusCounts: { [key: string]: number } = {};

    tasks.forEach((task) => {
      statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;
    });

    this.tasksInProgress = statusCounts['in-progress'] || 0;
   
    this.tasksToDo = statusCounts['todo'] || 0;
    this.TasksDone = statusCounts['done'] || 0;
    this.highPrioTasks = tasks.filter((task) => task.prio === 'high').length;
  }
}
