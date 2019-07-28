import {Component, Input} from '@angular/core';
import {CognitoUser} from 'amazon-cognito-identity-js';

@Component({
  selector: 'app-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.css']
})
export class MfaComponent {

  @Input() scenario: string;
  @Input() cognitoUser: CognitoUser;
  globalError: any;
  totp: any;

  onSubmitMfa() {
    if (this.scenario === 'verify') {
      this.cognitoUser.verifySoftwareToken(this.totp, 'My TOTP device', {
        onSuccess: session => {
        },
        onFailure: err => {
        }
      });
    } else if (this.scenario === 'regular') {
      this.cognitoUser.sendMFACode(this.totp, {
        onSuccess: session => {
          console.log(session);
        },
        onFailure: err => console.log(err)
      }, 'SOFTWARE_TOKEN_MFA');
    } else {
      console.error('Unknown scenario for MFA');
    }
  }
}
