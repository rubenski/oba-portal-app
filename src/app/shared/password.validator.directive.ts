import {Directive} from '@angular/core';
import {AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appPasswordValid]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordValidatorDirective,
    multi: true
  }]
})
export class PasswordValidatorDirective implements Validator {

  static isPasswordValid(control: AbstractControl): ValidationErrors | null {
    const password = control.value as string;

    const passwordLengthOk = password.length >= 8;
    const hasUpperCaseChar = password.search(/[A-Z]/) >= 0;
    const hasLowerCaseChar = password.search(/[a-z]/) >= 0;
    const hasNumber = password.search(/[0-9]/) >= 0;
    const hasSpecialChar = password.search(/[!%$&^*?()\/]/) >= 0;
    const isValid = /^[A-Za-z0-9!%$&^*?()\/]/.test(password);
    if (passwordLengthOk && hasUpperCaseChar && hasLowerCaseChar && hasSpecialChar && hasNumber && isValid) {
      return null; // valid
    }

    return {
      valid: false
    };
  }

  validate(c: FormControl): { [key: string]: any; } {
    // Prevent validation from firing when the form is loaded
    if (!c.pristine && c.value == null) {
      return PasswordValidatorDirective.isPasswordValid(c);
    }

  }
}
