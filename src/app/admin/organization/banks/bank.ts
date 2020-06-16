import {Group} from './group';
import {Api} from './api';

export class Bank {
  bankSystemName: string;
  displayName: string;
  beta: boolean;
  groups: Group[];
  apis: Api[];
}
