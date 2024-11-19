import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';

import { Task } from '../../classes/task.class';
import { UserSummary } from '../../classes/user-summary.class';
import { UserSummaryResponse } from '../../interfaces/users/user-summary-response-interface';
import { TaskResponse } from './../../interfaces/tasks/task-response-interface';
import { User } from '../../classes/user.class';
import { employee } from '../../classes/employee.class';
import { employeeData } from '../../interfaces/employees/employee-response-interface';

@Injectable({
  providedIn: 'root',
})
export class DataManagerService {
  public tasksSignal: WritableSignal<Task[]> = signal<Task[]>([]);
  public usersSignal: WritableSignal<UserSummary[]> = signal<UserSummary[]>([]);

  public tasks: Task[] = [];

  public loggedInUser?: User;
  public useremployees?: employee[];

  private http = inject(HttpClient);

  constructor() {
    this.getUser();
  }

  /**
   * Resets the checked state of all users.
   */
  resetUsersChecked() {
    this.usersSignal().forEach((user) => {
      user.checked = false;
    });
  }

  /**
   * Retrieves the logged-in user from local storage and initializes employees if available.
   */
  getUser() {
    if (!this.loggedInUser) {
      const user = localStorage.getItem('user');
      const employees = localStorage.getItem('employees');

      if (user && employees) {
        this.loggedInUser = new User(JSON.parse(user));
        const employeesJson = JSON.parse(employees);
        this.useremployees = employeesJson.map((jsonemployee: employeeData) => {
          return new employee(jsonemployee);
        });
      }
    }
  }

  /**
   * Fetches tasks from the server and updates the tasks array.
   */
  async getTasks() {
    const url = environment.baseUrl + '/tasks/';
    try {
      const resp = (await lastValueFrom(
        this.http.get(url)
      )) as Array<TaskResponse>;
      const tasks = resp.map((taskData: TaskResponse) => new Task(taskData));
      this.matchUserIdsWithUsers(tasks);
      this.tasksSignal.set(tasks);
      this.tasks = tasks;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Matches user IDs in tasks with corresponding user objects and assigns them to tasks.
   * @param tasks The array of tasks to update.
   */
  matchUserIdsWithUsers(tasks: Task[]) {
    const users = this.usersSignal();

    tasks.forEach((task) => {
      const matchedUsers = task.assignedTo
        .map((userId) => users.find((user) => user.id === userId))
        .filter((user): user is UserSummary => user !== undefined);
      task.assignedToUserSummarys = matchedUsers;
    });
  }

  /**
   * Creates a new task by sending a POST request to the server.
   * @param task The task object to be created.
   * @returns A promise that resolves with the response from the server.
   */
  async createTask(task: Task) {
    const url = environment.baseUrl + '/tasks/';
    const body = task.asPayloadJson();

    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * Updates an existing task by sending a PATCH request to the server.
   * @param task The task object to be updated.
   * @returns A promise that resolves with the response from the server.
   */
  async updateTask(task: Task) {
    const url = environment.baseUrl + '/tasks/' + task.id + '/';
    const body = task.asPayloadJson();

    return lastValueFrom(this.http.patch(url, body));
  }

  /**
   * Deletes an existing task by sending a DELETE request to the server.
   * @param task The task object to be deleted.
   * @returns A promise that resolves with the response from the server.
   */
  async deleteTask(task: Task) {
    const url = environment.baseUrl + '/tasks/' + task.id + '/';

    return lastValueFrom(this.http.delete(url));
  }

  /**
   * Retrieves users from the server by sending a GET request.
   * @returns A promise that resolves with an array of UserSummary objects.
   */
  async getUsers() {
    const url = environment.baseUrl + '/users/';

    try {
      const resp = (await lastValueFrom(
        this.http.get(url)
      )) as Array<UserSummaryResponse>;

      const users = resp.map(
        (userData: UserSummaryResponse) => new UserSummary(userData)
      );

      this.usersSignal.set(users);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Creates a new employee by sending a POST request to the server.
   * @param employee The employee object to be created.
   * @returns A promise that resolves when the employee creation is successful.
   */
  async createemployee(employee: employee) {
    const url = environment.baseUrl + '/employees/';
    const body = employee.asJson();

    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * Updates an existing employee by sending a PATCH request to the server.
   * @param employee The employee object to be updated.
   * @returns A promise that resolves when the employee update is successful.
   */
  async updateemployee(employee: employee) {
    const url = environment.baseUrl + '/employees/' + employee.id + '/';
    const body = employee.asJson();

    return lastValueFrom(this.http.patch(url, body));
  }

  /**
   * Deletes an existing employee by sending a DELETE request to the server.
   * @param employee The employee object to be deleted.
   * @returns A promise that resolves when the employee deletion is successful.
   */
  async deleteemployee(employee: employee) {
    const url = environment.baseUrl + '/employees/' + employee.id + '/';

    return lastValueFrom(this.http.delete(url));
  }
}
