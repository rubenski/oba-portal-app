import {NgModule} from '@angular/core';
import {PasswordValidatorDirective} from './password.validator.directive';
import {NotEmptyValidatorDirective} from './not-empty-validator.directive';
import {MinimumOneRoleCheckedValidator} from './minimum-one-role-selected-validator.directive';

@NgModule({
  imports: [],
  exports: [NotEmptyValidatorDirective, PasswordValidatorDirective, MinimumOneRoleCheckedValidator],
  declarations: [NotEmptyValidatorDirective, PasswordValidatorDirective, MinimumOneRoleCheckedValidator]
})
export class SharedModule {
}
