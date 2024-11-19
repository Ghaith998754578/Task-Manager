import { TaskResponse } from './../interfaces/tasks/task-response-interface';

import { Subtask } from './subtask.class';
import { UserSummary } from './user-summary.class';

export class Task {
  id: number;
  title: string;
  description: string;
 
  status: string;
  assignedTo: number[] | [];
  assignedToUserSummarys: UserSummary[] | [];
  dueDate: string;
  prio: string;
  subtasks: Subtask[];

  constructor(data?: TaskResponse) {
    this.id = data?.id || -1;
    this.title = data?.title || '';
    this.description = data?.description || '';
   
    this.status = data?.status || 'todo';
    this.assignedTo = data?.assigned_users || [];
    this.assignedToUserSummarys = [];
    this.dueDate = data?.due_date || '';
    this.prio = data?.priority || '';
    this.subtasks =
      data?.subtasks.map((subtaskData) => new Subtask(subtaskData)) || [];
  }

  asPayloadJson() {
    return {
      title: this.title,
      description: this.description,
      
      status: this.status,
      assigned_users: this.assignedTo,
      due_date: this.dueDate,
      priority: this.prio,
      subtasks: this.subtasksAsJson(),
    };
  }

  subtasksAsJson() {
    return this.subtasks.map((subtask: Subtask) => subtask.asJson());
  }
}
