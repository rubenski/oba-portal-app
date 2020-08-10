import {ApiRegistrationWithNrOfConnections} from './api.registration.with.nr.of.connections';

export class ApiWithRegistrations {
  id: string;
  sandbox: boolean;
  type: string;
  countryDataProviders: string[];
  apiRegistrations: ApiRegistrationWithNrOfConnections[];
  title: string;
}
