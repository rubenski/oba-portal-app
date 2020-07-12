import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {ApplicationHomeComponent} from './home/application.home.component';
import {ApplicationRoutingModule} from './application.routing.module';
import {PublicKeysListComponent} from './public-keys/public-keys-list.component';
import {CountryDataProvidersComponent} from './country-data-providers/country-data-providers.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ApplicationRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CountryDataProvidersComponent, ApplicationHomeComponent, PublicKeysListComponent],
  exports: [CountryDataProvidersComponent, ApplicationHomeComponent, PublicKeysListComponent]
})
export class ApplicationModule {

}
