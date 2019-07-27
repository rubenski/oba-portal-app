import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CustomersRoutingModule} from './customers-routing.module';
import {CustomersComponent} from './customers.component';


@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FlexLayoutModule
  ]
})
export class CustomersModule { }
