/**
 * We don't know yet what properties will be needed in this class. This depends on the behaviors that banks have implemented
 * for certificate rotation and (other) updates of the registration. TBD.
 */
export class ApiRegistrationUpdateOptions {
  multipleRegistrations: AllowsMultipleRegistrations;
  rotateSigningCertificate: RotateSigningCertificate;
}

export class AllowsMultipleRegistrations {
  onlyLastIsActive: boolean;
}

export class RotateSigningCertificate {
  lossOfExistingConsents: boolean;
}

