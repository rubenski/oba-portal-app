export class Api {
  id: string;
  type: string;
  baseUrl: string;
  requestSigningUsed: boolean;
  requestSigningAlgorithm: string;
  mutualTlsUsed: boolean;
  sandbox: boolean;
  beta: boolean;
  bank: BankApi;
}

export class BankApi {
  displayName: string;
}
