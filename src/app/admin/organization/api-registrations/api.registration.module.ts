import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {ApiRegistrationsListComponent} from './api-registrations-list.component';
import {ApiRegistrationsRoutingModule} from './api.registrations.routing.module';
import {ApiCreateRegistrationComponent} from './api-create-registration.component';
import {ApiRegistrationDetailComponent} from './api-registration-detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ApiRegistrationsRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [ApiRegistrationDetailComponent, ApiCreateRegistrationComponent, ApiRegistrationsListComponent],
  exports: [ApiRegistrationDetailComponent, ApiCreateRegistrationComponent, ApiRegistrationsListComponent]
})
export class ApiRegistrationModule {

}
