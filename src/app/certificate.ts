export class Certificate {
  name: string;
  description: string;
  purpose: string;

  country: string;
  stateOrProvince: string;
  locality: string;
  organizationName: string;
  organizationalUnitName: string;
  commonName: string;
  emailAddress: string;

  rolePisp: boolean;
  roleAisp: boolean;
  roleCisp: boolean;
}
