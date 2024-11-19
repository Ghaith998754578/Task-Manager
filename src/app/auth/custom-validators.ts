import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  constructor() {}

  /**
   * Validator function to check if the password and password repeat fields match.
   * @param control The form control containing the password and password repeat fields.
   * @returns A validation error if the fields don't match, otherwise null.
   */
  static passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const passwordRepeat = control.get('passwordRepeat');

    return password && passwordRepeat && password.value === passwordRepeat.value
      ? null
      : { passwordMismatch: true };
  };

  /**
   * Validator function to check if the email format is valid.
   * @param control The form control containing the email field.
   * @returns A validation error if the email format is invalid, otherwise null.
   */
  static emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailPattern.test(control.value);

    return isValid ? null : { invalidEmail: true };
  }

  /**
   * Validator function to check if the password length meets the minimum required length.
   * @param minLength The minimum length required for the password.
   * @returns A validation error if the password length is less than the minimum required length, otherwise null.
   */
  static passwordLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = control.value && control.value.length >= minLength;
      return isValid
        ? null
        : {
            minLength: {
              requiredLength: minLength,
              actualLength: control.value.length,
            },
          };
    };
  }

  /**
   * Validator function to check if the input string contains whitespace.
   * @returns A validation error if whitespace is found in the input string, otherwise null.
   */

  static noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const username: string = control.value;
      if (username && /\s/.test(username)) {
        return { noWhitespace: true };
      }
      return null;
    };
  }
}
