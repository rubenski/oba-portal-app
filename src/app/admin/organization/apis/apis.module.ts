import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {ApiListComponent} from './api-list.component';
import {ApisRoutingModule} from './apis.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ApisRoutingModule
  ],
  declarations: [ApiListComponent],
  exports: [ApiListComponent]
})
export class ApisModule {

}
