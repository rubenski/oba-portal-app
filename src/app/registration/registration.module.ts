import {Input, NgModule, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegistrationRoutingModule} from './registration-routing.module';
import {RegistrationComponent} from './registration.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {PasswordValidatorDirective} from '../shared/password.validator.directive';
import {NotEmptyValidatorDirective} from '../shared/not-empty-validator.directive';
import {RegistrationVerificationComponent} from './registration.verification.component';

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [
  ],
  declarations: [RegistrationComponent, RegistrationVerificationComponent]
})
export class RegistrationModule {
}
