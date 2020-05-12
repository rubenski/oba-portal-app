import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[appMinSelected]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinimumOneRoleCheckedValidator, multi: true}]
})
export class MinimumOneRoleCheckedValidator implements Validator {

  validate(control: AbstractControl): ValidationErrors {

    const roleAisp = control.get('roleAisp');
    const rolePisp = control.get('rolePisp');
    const rolePiisp = control.get('rolePiisp');

    // Return null when valid
    if (roleAisp && roleAisp.value) {
      return null;
    }

    if (rolePisp && rolePisp.value) {
      return null;
    }

    if (rolePiisp && rolePiisp.value) {
      return null;
    }

    return {appMinSelected: {value: false}};
  }
}

