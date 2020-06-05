import {AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[appUrlValid]',
  providers: [{provide: NG_VALIDATORS, useExisting: UrlValidDirective, multi: true}]
})
export class UrlValidDirective implements Validator {

  validate(c: FormControl): { [key: string]: any; } {
    // Prevent validation from firing when the form is loaded
    if (!c.pristine && c.value != null) {
      const val = c.value as string;
      return (val.startsWith('http://') || val.startsWith('https://')) && val.length > 10 ? null : {valid: false};
    }
  }
}
