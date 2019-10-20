import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {LoginService} from '../login/login.service';

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
  validCognitoSession: boolean;


  constructor(private router: Router, private loginService: LoginService) {
    this.validCognitoSession = true;
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
          this.exchangeCognitoTokenForObaSession(session.getIdToken());
        },
        onFailure: err => {
          this.handleMfaLoginError(err);
        }
      });
    } else if (this.scenario === 'regular') {
      // Called after every login
      this.cognitoUser.sendMFACode(this.totp, {
        onSuccess: session => {
          console.log(session);
          this.exchangeCognitoTokenForObaSession(session.getIdToken());
        },
        onFailure: err => {
          this.handleMfaLoginError(err);
        }
      }, 'SOFTWARE_TOKEN_MFA');
    } else {
      console.error('Unknown scenario for MFA');
    }
  }

  handleMfaLoginError(err) {
    if (err.code === 'CodeMismatchException') {
      this.globalError = 'Invalid code. Try again.';
    } else if (err.code === 'NotAuthorizedException') {
      this.globalError = 'Login failed. Please try logging in again.';
      this.validCognitoSession = false;
    } else if (err.name === 'EnableSoftwareTokenMFAException') {
      this.globalError = 'Invalid code. Try again.';
    } else {
      this.globalError = 'A technical error occurred';
    }
  }

  exchangeCognitoTokenForObaSession(token: any) {
    this.loginService.getObaSession(token).subscribe(
      data => {
        console.log('POST Request is successful ', data);
        this.loginService.setLoggedIn(true);
        this.router.navigate(['/admin']);
      },
      error => {
        console.log('Error', error);
        this.globalError = 'An error occurred. Could not log in at OBA.';
      }
    );
  }
}
