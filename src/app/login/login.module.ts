import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {RegistrationModule} from '../registration/registration.module';
import {MfaModule} from '../mfa/mfa.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FlexLayoutModule,
    FormsModule,
    RegistrationModule,
    MfaModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
}
