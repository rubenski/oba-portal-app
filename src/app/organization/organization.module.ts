import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {OrganizationComponent} from './organization.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    OrganizationComponent
  ],
  declarations: [OrganizationComponent]
})
export class OrganizationModule { }
