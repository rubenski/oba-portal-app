import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CustomersComponent} from './customers/customers.component';

import {FormsModule} from '@angular/forms';
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {MessagesComponent} from './messages/messages.component';
import {HttpClientModule} from '@angular/common/http';
import {LayoutModule} from './layout/layout.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import { PageComponent } from './page/page.component';
import {CognitoUtil} from './cognito.util';
import {RegistrationService} from './registration.service';

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
  exports: [

  ],
  providers: [CognitoUtil, RegistrationService],
  bootstrap: [AppComponent]

})
export class AppModule {
}
