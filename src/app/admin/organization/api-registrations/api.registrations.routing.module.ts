import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ApiRegistrationsListComponent} from './api-registrations-list.component';
import {ApiCreateRegistrationComponent} from './api-create-registration.component';
import {ApiRegistrationDetailComponent} from './api-registration-detail.component';

const routes: Routes = [
  {path: '', component: ApiRegistrationsListComponent},
  {path: ':apiRegistrationId', component: ApiRegistrationDetailComponent},
  {path: ':apiId/new', component: ApiCreateRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiRegistrationsRoutingModule {
}
