import {NgModule} from '@angular/core';
import {PasswordValidatorDirective} from './password.validator.directive';
import {NotEmptyValidatorDirective} from './not-empty-validator.directive';
import {MinimumOneRoleCheckedValidator} from './minimum-one-role-selected-validator.directive';
import {UrlValidDirective} from './url-valid.directive';

@NgModule({
  imports: [],
  exports: [UrlValidDirective, NotEmptyValidatorDirective, PasswordValidatorDirective, MinimumOneRoleCheckedValidator],
  declarations: [UrlValidDirective, NotEmptyValidatorDirective, PasswordValidatorDirective, MinimumOneRoleCheckedValidator]
})
export class SharedModule {
}
