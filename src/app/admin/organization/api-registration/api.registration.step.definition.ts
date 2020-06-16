import {Certificate} from './certificate';
import {FormDefinition} from './form.definition';

export class ApiRegistrationStepDefinition {
  stepNr: number;
  apiId: string;
  signingCertificates: Certificate[];
  transportCertificates: Certificate[];
  formDefinition: FormDefinition;
}
