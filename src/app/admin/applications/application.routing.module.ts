import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ApplicationHomeComponent} from './application.home.component';

const routes: Routes = [
  {path: ':id', component: ApplicationHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule {

}
