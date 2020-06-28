import {Certificate} from './certificate';

export class ApiRegistration {
  id: string;
  organizationId: string;
  apiId: string;
  signingCertificate: Certificate;
  tlsCertificate: Certificate;
  enabled: boolean;
  created: string;
}
