interface UserData {
  first_name: string;
  last_name: string;
  id: number;
  initials: string;
  color: string;
}

export class UserSummary {
  firstName: string;
  lastName: string;

  id: number;
  checked: boolean;
  initials: string;
  color: string;

  constructor(data?: UserData) {
    this.firstName = data?.first_name || '';
    this.lastName = data?.last_name || '';
    this.id = data?.id || -1;
    this.checked = false;
    this.initials = data?.initials || '';
    this.color = data?.color || '';
  }

  toJson() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      id: this.id,
    };
  }
}
