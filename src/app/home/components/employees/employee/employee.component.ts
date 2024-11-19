import { Component, Input } from '@angular/core';
import { employee } from '../../../../classes/employee.class';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class employeeComponent {
  @Input() employee: employee = new employee();
  @Input() active: boolean = false;
}
