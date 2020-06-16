import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ApiRegistrationsListComponent} from './api-registrations-list.component';
import {ApiRegistrationComponent} from './api.registration.component';

const routes: Routes = [
  {path: '', component: ApiRegistrationsListComponent},
  {path: ':apiId', component: ApiRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiRegistrationsRoutingModule {
}
