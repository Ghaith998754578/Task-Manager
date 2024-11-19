import { employee } from '../../classes/employee.class';

interface UserData {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  initials: string;
  color: string;
}

export interface LoginResponse {
  token: string;
  user: UserData;
  employees: employee[];
}
