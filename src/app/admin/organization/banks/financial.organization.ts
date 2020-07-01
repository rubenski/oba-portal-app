import {Group} from './group';
import {Api} from './api';

export class FinancialOrganization {
  systemName: string;
  displayName: string;
  beta: boolean;
  groups: Group[];
  apis: Api[];
}
