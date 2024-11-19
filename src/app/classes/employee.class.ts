import { employeeData } from '../interfaces/employees/employee-response-interface';

export class employee {
  id: number;
  name: string;
  email: string;
  phone: number;
  initials: string;
  color: string;

  constructor(data?: employeeData) {
    this.id = data?.id || -1;
    this.name = data?.name || '';
    this.name = data?.name || '';
    this.email = data?.email || '';
    this.phone = data?.phone || -1;
    this.initials = data?.initials || '';
    this.color = data?.color || '';
  }

  asJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      initials: this.initials,
      color: this.color,
    };
  }
}
