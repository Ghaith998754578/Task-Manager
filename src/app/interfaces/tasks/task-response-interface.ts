export interface TaskResponse {
  author: number;
  id: number;
  title: string;
  description: string;
  status: string;
  
  assigned_users: number[] | [];
  due_date: string;
  priority: string;
  subtasks: [];
}
