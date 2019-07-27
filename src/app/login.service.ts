import {Injectable} from '@angular/core';
import {Credentials} from './login/login.component';
import {CognitoCallback} from './shared/cognito.callback';
import {AuthenticationDetails, CognitoUser, CognitoUserSession} from 'amazon-cognito-identity-js';
import {CognitoUtil} from './cognito.util';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private cognito: CognitoUtil) {
  }

  authenticate(credentials: Credentials, cognitoCallback: CognitoCallback) {
    const authenticationData = {
      Username: credentials.username,
      Password: credentials.password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: credentials.username,
      Pool: this.cognito.getUserPool()
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      newPasswordRequired: (userAttributes, requiredAttributes) => cognitoCallback.processCallback(`User needs to set password.`, null),
      onSuccess: result => this.onLoginSuccess(cognitoCallback, result),
      onFailure: err => this.onLoginError(cognitoCallback, err),
      mfaSetup: (challengeName: any, challengeParameters: any) => cognitoCallback.handleMFASetup(challengeName, challengeParameters, cognitoUser),
      mfaRequired: (challengeName, challengeParameters) => {
        cognitoCallback.handleMFAStep(challengeName, challengeParameters, (confirmationCode: string) => {
          cognitoUser.sendMFACode(confirmationCode, {
            onSuccess: result => this.onLoginSuccess(cognitoCallback, result),
            onFailure: err => this.onLoginError(cognitoCallback, err)
          });
        });
      }
    });
  }

  private onLoginSuccess = (callback: CognitoCallback, session: CognitoUserSession) => {
    console.log(session);
  }

  private onLoginError(cognitoCallback: CognitoCallback, err: any) {
    console.log(err);
  }
}
