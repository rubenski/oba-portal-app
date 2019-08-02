import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.css']
})
export class MfaComponent implements OnInit {

  @ViewChild('totpForm', null) totpForm: NgForm;
  @Input() scenario: string;
  @Input() cognitoUser: CognitoUser;
  globalError: any;
  totp: any;


  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log('init mfa comp');
    this.totpForm.form.setErrors({});
  }

  onSubmitMfa() {
    if (this.scenario === 'verify') {
      // Called after first login of the user and right after user set up his Authy/Google Authenticator account
      this.cognitoUser.verifySoftwareToken(this.totp, 'My TOTP device', {
        onSuccess: session => {
          console.log(session);
          this.router.navigate(['/portal']);
        },
        onFailure: err => {
          this.globalError = 'shit verify';
        }
      });

    } else if (this.scenario === 'regular') {
      // Called after every login
      this.cognitoUser.sendMFACode(this.totp, {
        onSuccess: session => {
          console.log(session);
        },
        onFailure: err => {
          if (err.code === 'CodeMismatchException') {
            this.globalError = 'Invalid code. Try again.';
          }
        }
      }, 'SOFTWARE_TOKEN_MFA');
    } else {
      console.error('Unknown scenario for MFA');
    }
  }

}
