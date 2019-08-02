import {Directive} from '@angular/core';
import {FormControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
  selector: '[appNotEmpty]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NotEmptyValidatorDirective,
    multi: true
  }]
})
export class NotEmptyValidatorDirective implements Validator {

  validate(c: FormControl): { [key: string]: any; } {
    // Prevent validation from firing when the form is loaded
    if (!c.pristine && c.value != null) {
      const val = c.value as string;
      const valueLength = val.trim().length;
      const result = valueLength > 0 ? null : {valid: false};
      return result;
    }
  }
}
