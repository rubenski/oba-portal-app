import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {FormsModule} from '@angular/forms';
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
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

@NgModule({
  declarations: [
    AppComponent,
    CustomerDetailComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([], {enableTracing: false}),
    FlexLayoutModule,
    LayoutModule
  ],
  exports: [],
  providers: [LoginService, OrganizationService, CognitoUtil, RegistrationService, {
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
