import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {MainInfoComponent} from './main-info/main-info.component';
import {OrganizationRoutingModule} from './organization.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    OrganizationRoutingModule
  ],
  exports: [
    MainInfoComponent
  ],
  declarations: [MainInfoComponent]
})
export class OrganizationModule {
}
