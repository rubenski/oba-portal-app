import {CertUsedForBank} from './cert-used-for-bank';

export class Certificate {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  keyPurpose: string;
  csrDistinguishedName: string;
  csr: string;
  certificateDistinguishedName: string;
  signedCertificate: string;
  created: string;
}
