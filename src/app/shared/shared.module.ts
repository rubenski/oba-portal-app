import {NgModule} from '@angular/core';
import {PasswordValidatorDirective} from './password.validator.directive';
import {NotEmptyValidatorDirective} from './not-empty-validator.directive';

@NgModule({
  imports: [],
  exports: [NotEmptyValidatorDirective, PasswordValidatorDirective],
  declarations: [NotEmptyValidatorDirective, PasswordValidatorDirective]
})
export class SharedModule {
}
