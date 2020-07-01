export class Api {
  id: string;
  type: string;
  baseUrl: string;
  requestSigningUsed: boolean;
  requestSigningAlgorithm: string;
  mutualTlsUsed: boolean;
  sandbox: boolean;
  beta: boolean;
  financialOrganization: FinancialOrganization;
}

export class FinancialOrganization {
  displayName: string;
}
