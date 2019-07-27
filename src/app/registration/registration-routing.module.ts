import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration.component';
import {RegistrationVerificationComponent} from './registration.verification.component';

const routes: Routes = [
  { path: '', component: RegistrationComponent },
  { path: 'verify/:email', component: RegistrationVerificationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
