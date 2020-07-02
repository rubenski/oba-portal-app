import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApplicationsRoutingModule} from './applications.routing.module';
import {ApplicationsListComponent} from './applications.list.component';
import {SharedModule} from '../../../shared/shared.module';
import {CreateApplicationComponent} from './create.application.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ApplicationsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ApplicationsListComponent, CreateApplicationComponent],
  exports: [ApplicationsListComponent, CreateApplicationComponent]
})
export class ApplicationsModule {

}
