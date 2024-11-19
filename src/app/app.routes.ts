import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';

import { HomeComponent } from './home/components/home/home.component';
import { SummaryComponent } from './home/components/summary/summary.component';
import { BoardComponent } from './home/components/board/board.component';
import { AddTaskComponent } from './home/components/add-task/add-task.component';
import { employeesComponent } from './home/components/employees/employees.component';


import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
 
  
 

  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: SummaryComponent },
      { path: 'board', component: BoardComponent },
      { path: 'add-task', component: AddTaskComponent },
      { path: 'employees', component: employeesComponent },
    
     
    ],
  },
];
