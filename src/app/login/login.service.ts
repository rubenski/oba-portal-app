import {Injectable} from '@angular/core';
import {Credentials} from './login.component';
import {CognitoCallback} from '../shared/cognito.callback';
import {AuthenticationDetails, CognitoUser, CognitoUserSession} from 'amazon-cognito-identity-js';
import {CognitoUtil} from '../cognito.util';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private sessionUrl = environment.obaPortalBackendHostName + '/sessions/';
  private organizationUrl = environment.obaPortalBackendHostName + '/organization/';

  constructor(private cognito: CognitoUtil, private http: HttpClient) {
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
      },
      totpRequired: (challengeName, challengeParameters) => cognitoCallback.handleTotpRequired(challengeName, challengeParameters, cognitoUser)
    })
    ;
  }

  getObaSession(token: any) {
    return this.http.post(this.sessionUrl, token);
  }

  createOrganization(token: any) {
    return this.http.post(this.organizationUrl, token);
  }

  private onLoginSuccess = (callback: CognitoCallback, session: CognitoUserSession) => {
    console.log(session);
  }

  private onLoginError(cognitoCallback: CognitoCallback, err: any) {
    console.log(err);
  }

}
