import { Component, HostListener, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { LoginResponse } from '../../../interfaces/auth/login-response-interface';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AuthBaseComponent } from '../auth-base/auth-base.component';
import { ButtonWoIconComponent } from '../../../shared/components/buttons/button-wo-icon/button-wo-icon.component';
import { User } from '../../../classes/user.class';
import { DataManagerService } from '../../../home/services/data-manager.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    AuthBaseComponent,
    ButtonWoIconComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  startAnimation: boolean = false;
  endAnimation: boolean = false;
  passwordIsHidden: boolean = true;
  loginError: boolean = false;

  loginButtonWidth: string = '145px';
  guestLoginButtonWidth: string = 'auto';
  buttonHeight: string = '51px';
  buttonFontSize: string = '21px';

  rememberMe: boolean = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);
  private dataManager = inject(DataManagerService);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.updateButtonSize();
    this.checkLocalStorage();
  }

  ngAfterViewInit() {
    this.animateLogo();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateButtonSize();
  }

  /**
   * Updates the button size based on the window width.
   */
  updateButtonSize() {
    const width = window.innerWidth;

    if (width < 850) {
      this.buttonFontSize = '16px';
      this.buttonHeight = '45px';
      this.loginButtonWidth = '200px';
      this.guestLoginButtonWidth = '200px';
    } else {
      this.buttonFontSize = '21px';
      this.buttonHeight = '51px';
      this.loginButtonWidth = '145px';
      this.guestLoginButtonWidth = 'auto';
    }
  }

  animateLogo() {
    setTimeout(() => {
      this.startAnimation = true;
    }, 300);

    setTimeout(() => {
      this.endAnimation = true;
    }, 450 + 300);
  }

  /**
   * Getter method for the 'email' form control.
   *
   * @returns The 'email' form control.
   */
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  /**
   * Attempts to log in the user using the provided credentials.
   */
  async login() {
    this.setLocalStorage();
    this.loginError = false;
    try {
      const resp: LoginResponse = (await this.auth.loginWithEmailAndPassword(
        this.username?.value,
        this.password?.value
      )) as LoginResponse;
      this.handleSuccessfullLogin(resp);
    } catch (err) {
      this.loginError = true;
      console.error(err);
    }
  }

  /**
   * Attempts to log in the user as a guest.
   */
  async guestLogin() {
    try {
      const resp: LoginResponse = (await this.auth.loginWithEmailAndPassword(
        'TestUser',
        'Test123'
      )) as LoginResponse;

      this.handleSuccessfullLogin(resp);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Checks if there are stored credentials in the local storage and updates the form accordingly.
   */
  checkLocalStorage() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (username && password) {
      this.rememberMe = true;

      this.loginForm.patchValue({
        username: username,
        password: password,
      });
    }
  }

  /**
   * Stores the username and password in the local storage if the 'remember me' option is checked.
   * Otherwise, removes them from the local storage.
   */
  setLocalStorage() {
    if (this.rememberMe) {
      localStorage.setItem('username', this.username?.value);
      localStorage.setItem('password', this.password?.value);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
  }

  /**
   * Handles the successful login response.
   * Stores the token, user data, and employees in the local storage,
   * updates the logged-in user and employees in the data manager,
   * and navigates to the home page.
   *
   * @param resp The login response containing the token, user data, and employees.
   */
  handleSuccessfullLogin(resp: LoginResponse) {
    localStorage.setItem('token', resp.token);
    localStorage.setItem('user', JSON.stringify(resp.user));
    localStorage.setItem('employees', JSON.stringify(resp.employees));
    this.dataManager.loggedInUser = new User(resp.user);
    this.dataManager.useremployees = resp.employees;
    this.router.navigateByUrl('/home');
  }

  /**
   * Toggles the visibility of the password input.
   * Updates the passwordIsHidden flag accordingly.
   */
  togglePasswordVisibility() {
    this.passwordIsHidden = !this.passwordIsHidden;
  }
}
