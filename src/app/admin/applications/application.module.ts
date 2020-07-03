import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {ApplicationHomeComponent} from './application.home.component';
import {ApplicationRoutingModule} from './application.routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ApplicationRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ApplicationHomeComponent],
  exports: [ApplicationHomeComponent]
})
export class ApplicationModule {

}
