import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {BankRegistrationsListComponent} from './bank-registrations-list.component';
import {BankRegistrationsRoutingModule} from './bank-registrations.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    BankRegistrationsRoutingModule
  ],
  declarations: [BankRegistrationsListComponent],
  exports: [BankRegistrationsListComponent]
})
export class BankRegistrationsModule {

}
