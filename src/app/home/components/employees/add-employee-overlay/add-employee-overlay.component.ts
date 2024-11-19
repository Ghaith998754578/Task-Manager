import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ButtonWithIconComponent } from '../../../../shared/components/buttons/button-with-icon/button-with-icon.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { employee } from '../../../../classes/employee.class';
import { DataManagerService } from '../../../services/data-manager.service';
import { employeeData } from '../../../../interfaces/employees/employee-response-interface';

@Component({
  selector: 'app-add-employee-overlay',
  standalone: true,
  imports: [
    CommonModule,
    ButtonWithIconComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-employee-overlay.component.html',
  styleUrl: './add-employee-overlay.component.scss',
})
export class AddemployeeOverlayComponent {
  @Input() animation: boolean = false;
  @Input() employee: employee = new employee();
  @Input() edit: boolean = false;

  @Output() closeOverlayEvent: EventEmitter<{
    action: boolean;
    delete: boolean;
    id: number;
  }> = new EventEmitter<{ action: boolean; delete: boolean; id: number }>();

  colors: string[] = [
    '#008ddc',
    '#ff7827',
    '#a900f8',
    '#502787',
    '#ff63fa',
    '#00d345',
    '#bb051d',
    '#ffc938',
  ];

  employeeForm: FormGroup;

  private fb = inject(FormBuilder);
  private dataManager = inject(DataManagerService);

  constructor() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.edit && this.employee) {
      this.employeeForm.patchValue({
        name: this.employee.name,
        email: this.employee.email,
        phone: this.employee.phone,
      });
    }
  }

  /**
   * Getter method for the 'name' form control.
   *
   * @returns The 'name' form control.
   */
  get name() {
    return this.employeeForm.get('name');
  }

  /**
   * Getter method for the 'email' form control.
   *
   * @returns The 'email' form control.
   */
  get email() {
    return this.employeeForm.get('email');
  }

  /**
   * Getter method for the 'phone' form control.
   *
   * @returns The 'phone' form control.
   */
  get phone() {
    return this.employeeForm.get('phone');
  }

  /**
   * Emits an event to close the overlay.
   *
   * @param employeeCreateOrEdit Flag indicating if a employee is created or edited.
   * @param deleted Flag indicating if the employee is deleted.
   * @param employeeId The ID of the employee.
   */
  closeOverlay(
    employeeCreateOrEdit: boolean,
    deleted: boolean,
    contatId: number
  ) {
    this.closeOverlayEvent.emit({
      action: employeeCreateOrEdit,
      delete: deleted,
      id: contatId,
    });
  }

  /**
   * Adds or edits a employee based on the form validity and edit mode.
   */
  addOrEditemployee() {
    if (this.employeeForm.valid && this.employee) {
      this.fillemployeeData();

      if (this.edit) {
        this.editemployee();
      } else {
        this.addemployee();
      }
    }
  }

  /**
   * Fills the employee data from the form values.
   */
  fillemployeeData() {
    this.employee.name = this.employeeForm.value.name;
    this.employee.email = this.employeeForm.value.email;
    this.employee.phone = this.employeeForm.value.phone;
    if (!this.employee.color) this.employee.color = this.getRandomColor();
    this.employee.initials = this.getInitials();
  }

  /**
   * Adds a new employee to the user's employees.
   */
  async addemployee() {
    try {
      const resp: employeeData = await this.dataManager.createemployee(
        this.employee
      );
      const serveremployee = new employee(resp);
      this.employee = serveremployee;
      this.dataManager.useremployees?.push(serveremployee);
      localStorage.setItem(
        'employees',
        JSON.stringify(this.dataManager.useremployees)
      );
      this.closeOverlay(true, false, serveremployee.id);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Edits an existing employee.
   */
  editemployee() {
    try {
      this.dataManager.updateemployee(this.employee);
      localStorage.setItem(
        'employees',
        JSON.stringify(this.dataManager.useremployees)
      );
      this.closeOverlay(true, false, this.employee.id);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Deletes the selected employee.
   */
  async deleteemployee() {
    if (this.employee) {
      try {
        await this.dataManager.deleteemployee(this.employee);
        this.closeOverlay(true, true, this.employee.id);
      } catch (err) {
        console.error(err);
      }
    }
  }

  /**
   * Generates a random color from the available colors.
   */
  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  /**
   * Gets the initials from the employee's name.
   */
  getInitials() {
    const names = this.employeeForm.value.name.toUpperCase().trim().split(' ');

    if (names.length === 1) return names[0].charAt(0);
    else {
      const firstLetter = names[0].charAt(0);
      const lastLetter = names[names.length - 1].charAt(0);
      return firstLetter + lastLetter;
    }
  }
}
