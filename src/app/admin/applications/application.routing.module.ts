import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ApplicationHomeComponent} from './home/application.home.component';
import {PublicKeysListComponent} from './public-keys/public-keys-list.component';
import {CountryDataProvidersComponent} from './country-data-providers/country-data-providers.component';

const routes: Routes = [
  {path: ':id', component: ApplicationHomeComponent},
  {path: ':id/public-keys', component: PublicKeysListComponent},
  {path: ':id/available-apis', component: CountryDataProvidersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule {

}
