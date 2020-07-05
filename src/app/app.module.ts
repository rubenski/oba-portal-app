import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessagesComponent} from './messages/messages.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LayoutModule} from './layout/layout.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {CognitoUtil} from './cognito.util';
import {RegistrationService} from './registration/registration.service';
import {FindActiveSessionInterceptor} from './shared/find-active-session-interceptor.service';
import {LoginService} from './login/login.service';
import {LoggedinInterceptor} from './loggedin.interceptor';
import {OrganizationService} from './organization.service';
import {CertificateService} from './certificate.service';
import {ErrorService} from './error.service';
import {RedirectUrlService} from './redirect-url.service';
import {FOService} from './banks.service';
import {ApiRegistrationService} from './api.registration.service';
import {ApiService} from './api.service';
import {ApplicationService} from './application.service';
import {AdminHeaderService} from './admin.header.service';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot([], {enableTracing: false}),
    FlexLayoutModule,
    LayoutModule
  ],
  exports: [],
  providers: [AdminHeaderService, ApplicationService, ApiService, ApiRegistrationService, FOService, RedirectUrlService, ErrorService, LoginService,
    CertificateService, OrganizationService, CognitoUtil, RegistrationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: FindActiveSessionInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: LoggedinInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]

})
export class AppModule {
}
