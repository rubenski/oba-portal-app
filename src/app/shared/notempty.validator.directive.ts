import {Directive} from '@angular/core';
import {AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appNotEmpty]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NotemptyValidatorDirective,
    multi: true
  }]
})
export class NotemptyValidatorDirective implements Validator {

  validate(c: FormControl): { [key: string]: any; } {
    // Prevent validation from firing when the form is loaded
    if (!c.pristine && c.value != null) {
      const val = c.value as string;
      const valueLength = val.trim().length;
      return valueLength > 0 ? null : {valid: false};
    }
  }
}
