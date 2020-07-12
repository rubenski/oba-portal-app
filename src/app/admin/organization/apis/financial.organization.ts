import {Group} from './group';
import {ApiWithCountryDataProviders} from './api.with.country.data.providers';

export class FinancialOrganization {
  systemName: string;
  displayName: string;
  beta: boolean;
  groups: Group[];
  apis: ApiWithCountryDataProviders[];
}
