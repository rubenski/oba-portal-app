import {ApiRegistration} from '../api-registrations/api.registration';
import {CountryDataProvider} from './country.data.provider';


export class ApiWithCountryDataProviders {
  apiId: string;
  type: string;
  flowType: string;
  sandbox: boolean;
  status: string;
  services: string[];
  apiRegistrations: ApiRegistration[] = [];
  countryDataProviders: CountryDataProvider[];
  title: string;
}
