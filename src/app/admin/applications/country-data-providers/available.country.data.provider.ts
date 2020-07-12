import {CountryDataProvider} from './country.data.provider';
import {AvailableCountryDataProviderApi} from './available.country.data.provider.api';

export class AvailableCountryDataProvider {
  countryDataProvider: CountryDataProvider;
  availableCountryDataProviderApi: AvailableCountryDataProviderApi;
  enabled: boolean;
}
