import { Component, HostListener, inject } from '@angular/core';
import { AuthBaseComponent } from '../auth-base/auth-base.component';
import { ButtonWoIconComponent } from '../../../shared/components/buttons/button-wo-icon/button-wo-icon.component';
import { SuccessMessageComponent } from '../../../shared/components/success-message/success-message.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomValidators } from '../../custom-validators';
import { CommonModule } from '@angular/common';
import { User } from '../../../classes/user.class';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    AuthBaseComponent,
    ButtonWoIconComponent,
    SuccessMessageComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signUpForm: FormGroup;
  buttonWidth: string = '145px';
  buttonHeight: string = '51px';
  buttonFontSize: string = '21px';

  passwordIsHidden: boolean = true;
  passwordRepeatIsHidden: boolean = true;

  usernameHttpErrorCode: number | null = null;
  emailHttpErrorCode: number | null = null;

  loading: boolean = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);

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

  constructor() {
    this.signUpForm = this.fb.group({
      username: [
        '',
        [Validators.required, CustomValidators.noWhitespaceValidator()],
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.emailValidator]],
      password: [
        '',
        [Validators.required, CustomValidators.passwordLengthValidator(8)],
      ],
      passwordRepeat: [
        '',
        [Validators.required, CustomValidators.passwordLengthValidator(8)],
      ],
    }, { validators: [CustomValidators.passwordMatchValidator] });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateButtonSize();
  }

  updateButtonSize() {
    const width = window.innerWidth;

    if (width < 850) {
      this.buttonFontSize = '16px';
      this.buttonHeight = '45px';
      this.buttonWidth = '200px';
    } else {
      this.buttonFontSize = '21px';
      this.buttonHeight = '51px';
      this.buttonWidth = '145px';
    }
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get passwordRepeat() {
    return this.signUpForm.get('passwordRepeat');
  }

  togglePasswordVisibility() {
    this.passwordIsHidden = !this.passwordIsHidden;
  }

  togglePasswordRepeatVisibility() {
    this.passwordRepeatIsHidden = !this.passwordRepeatIsHidden;
  }

  resetError(type: string) {
    if (type === 'username') this.usernameHttpErrorCode = null;
    if (type === 'email') this.emailHttpErrorCode = null;
  }

  async signUp() {
    const user = new User();
    user.username = this.username?.value;
    user.email = this.email?.value;
    user.password = this.password?.value;
    user.firstName = this.firstName?.value;
    user.lastName = this.lastName?.value;

    if (this.signUpForm.valid) {
      this.loading = true;
      this.signUpForm.disable();
      this.setColorAndInitials(user);
      try {
        await this.auth.createUserWithUsernameAndPassword(user);
        this.router.navigateByUrl('/login'); // Directly navigate to login page
      } catch (err: any) {
        this.handleError(err);
      }
    } else this.signUpForm.markAllAsTouched();
  }

  setColorAndInitials(user: User) {
    user.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    user.initials =
      user.firstName.charAt(0).toUpperCase() +
      user.lastName.charAt(0).toUpperCase();
  }

  handleError(err: HttpErrorResponse) {
    if (err.error.message.includes('username')) {
      this.usernameHttpErrorCode = err.status;
    } else if (err.error.message.includes('email')) {
      this.emailHttpErrorCode = err.status;
    } else console.error(err);

    this.loading = false;
    this.signUpForm.enable();
  }
}
