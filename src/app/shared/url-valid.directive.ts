import {FormControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {Directive} from '@angular/core';

@Directive({
  selector: '[appUrlValid]',
  providers: [{provide: NG_VALIDATORS, useExisting: UrlValidDirective, multi: true}]
})
export class UrlValidDirective implements Validator {

  validate(c: FormControl): { [key: string]: any; } {
    const val = c.value as string;
    let valid;
    if (val) {
      valid = (val.startsWith('http://') || val.startsWith('https://')) && val.length > 8;
      return valid ? null : {redirectUrl: false};
    }
    return {redirectUrl: false};
  }
}
