import {RedirectUrlBankRegistration} from './redirect.url.bank.registration';

export class RedirectUrl {
  id: string;
  redirectUrl: string;
  created: string;
  bankRegistrations: RedirectUrlBankRegistration[];
}
