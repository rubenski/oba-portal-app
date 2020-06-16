import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {ApiRegistrationsListComponent} from './api-registrations-list.component';
import {ApiRegistrationsRoutingModule} from './api.registrations.routing.module';
import {ApiRegistrationComponent} from './api.registration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ApiRegistrationsRoutingModule
  ],
  declarations: [ApiRegistrationComponent, ApiRegistrationsListComponent],
  exports: [ApiRegistrationComponent, ApiRegistrationsListComponent]
})
export class ApiRegistrationModule {

}
