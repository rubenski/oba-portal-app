import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {LoginService} from '../login/login.service';
import * as AWS from 'aws-sdk';

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


  constructor(private router: Router, private loginService: LoginService) {
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
          this.submitTokenToObaPortal(session);
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
          this.submitTokenToObaPortal(session);
        },
        onFailure: err => {
          if (err.code === 'CodeMismatchException') {
            this.globalError = 'Invalid code. Try again.';
          } else if (err.code === 'NotAuthorizedException') {
            this.globalError = 'Please log in again';
          }
        }
      }, 'SOFTWARE_TOKEN_MFA');
    } else {
      console.error('Unknown scenario for MFA');
    }
  }

  submitTokenToObaPortal(token: any) {
    this.loginService.cognitoTokenToOba(token).subscribe(
      data => {
        console.log('POST Request is successful ', data);
        this.router.navigate(['/portal']);
      },
      error => {
        console.log('Error', error);
      }
    );
  }

}
