import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {BanksListComponent} from './banks-list.component';
import {BanksRoutingModule} from './banks.routing.module';
import {BankDetailComponent} from './bank-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    BanksRoutingModule
  ],
  declarations: [BanksListComponent, BankDetailComponent],
  exports: [BanksListComponent, BankDetailComponent]
})
export class BanksModule {

}
