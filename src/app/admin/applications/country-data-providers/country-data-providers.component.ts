import {Component} from '@angular/core';
import {ApplicationBaseComponent} from '../application.base.component';
import {ApplicationService} from '../../../application.service';
import {AdminHeaderService} from '../../../admin.header.service';
import {ActivatedRoute} from '@angular/router';
import {AvailableCountryDataProvider} from './available.country.data.provider';


@Component({
  templateUrl: './country-data-providers.component.html'
})
export class CountryDataProvidersComponent extends ApplicationBaseComponent {

  public keys: any;
  public availableCountryDataProviders: AvailableCountryDataProvider[];
  globalError: any;


  constructor(applicationService: ApplicationService,
              route: ActivatedRoute,
              adminHeaderService: AdminHeaderService) {
    super(applicationService, route, adminHeaderService);
  }

  init() {
    this.applicationService.findAvailableCountryDataProvidersWithEnabledProjection(this.application.id).subscribe(result => {
      this.availableCountryDataProviders = result;
    });
  }

  delete(id: string) {
    if (confirm('Are you sure you want to delete this public key?')) {
      this.applicationService.deleteApplicationPublicKey(this.application.id, id).subscribe(() => this.init());
    }
  }

  submit(countryDataProviderSystemName: string, enabledForApplication: boolean) {
    console.log('enabled: ' + enabledForApplication);
    if (enabledForApplication && confirm('Are you sure you want to disable this API?')) {
      this.applicationService.deleteEnabledCountryDataProvider(this.application.id, countryDataProviderSystemName).subscribe(result => this.ngOnInit());
    } else {
      this.applicationService.createEnabledCountryDataProvider(this.application.id, countryDataProviderSystemName).subscribe(result => this.ngOnInit());
    }
  }
}

