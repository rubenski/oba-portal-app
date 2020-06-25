import {Group} from './group';
import {Api} from './api';

export class Bank {
  systemName: string;
  displayName: string;
  beta: boolean;
  groups: Group[];
  apis: Api[];
}
