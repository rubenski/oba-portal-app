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
        alert(err);
        return;
      }
      console.log('call result: ' + result);
      this.success = result === 'SUCCESS';
    });
  }


}
