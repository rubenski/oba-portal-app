import {Component, OnInit} from '@angular/core';
import {CognitoUtil} from '../cognito.util';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './registration.verification.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationVerificationComponent {

  public verificationCode: string;
  public success;
  public globalError: string;


  constructor(private cognito: CognitoUtil, private route: ActivatedRoute) {
  }

  onSubmit() {
    this.verify();
  }

  verify() {

    const email = atob(this.route.snapshot.paramMap.get('email'));

    const userPool = this.cognito.getUserPool();

    const confirm = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser: CognitoUser = new CognitoUser(confirm);
    cognitoUser.confirmRegistration(this.verificationCode, true, (err, result) => {
        if (err) {
          if (err.code === 'CodeMismatchException') {
            this.globalError = 'Invalid code. Try again.';
          } else if (err.code === 'LimitExceededException') {
            this.globalError = 'Too many verification attempts. Please wait for a while.';
          } else if (err.code === 'NotAuthorizedException') {
            this.globalError = 'Can\'t confirm user. User may already be confirmed';
          } else {
            this.globalError = 'An unknown error occurred.';
          }
          return;
        }
        this.success = result === 'SUCCESS';
      }
    );
  }


}
