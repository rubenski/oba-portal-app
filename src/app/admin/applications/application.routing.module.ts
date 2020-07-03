import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ApplicationHomeComponent} from './home/application.home.component';
import {PublicKeysListComponent} from './public-keys/public-keys-list.component';

const routes: Routes = [
  {path: ':id', component: ApplicationHomeComponent},
  {path: ':id/public-keys', component: PublicKeysListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule {

}
