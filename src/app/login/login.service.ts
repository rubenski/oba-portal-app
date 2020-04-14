import {Injectable} from '@angular/core';
import {Credentials} from './login.component';
import {CognitoCallback} from '../shared/cognito.callback';
import {AuthenticationDetails, CognitoUser, CognitoUserSession} from 'amazon-cognito-identity-js';
import {CognitoUtil} from '../cognito.util';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AppConstants} from '../app.constants';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class LoginService {

  private sessionsUrl = environment.obaPortalBackendHostName + '/sessions/';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private cognito: CognitoUtil, private http: HttpClient) {
    console.log('login service created');
  }

  login(credentials: Credentials, cognitoCallback: CognitoCallback) {
    console.log('LOGIN called!');

    const authenticationDetails = new AuthenticationDetails({
      Username: credentials.username,
      Password: credentials.password,
    });

    const userData = {
      Username: credentials.username,
      Pool: this.cognito.getUserPool()
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      newPasswordRequired: (userAttributes, requiredAttributes) => console.log('method not implemented'),
      onSuccess: result => console.log('method not implemented'),
      onFailure: err => cognitoCallback.handleLoginError(err),
      mfaSetup: (challengeName: any, challengeParameters: any) => cognitoCallback.handleMFASetup(challengeName, challengeParameters, cognitoUser),
      mfaRequired: (challengeName, challengeParameters) => {
        console.log('method not implemented');
      },
      totpRequired: (challengeName, challengeParameters) => cognitoCallback.handleTotpRequired(challengeName, challengeParameters, cognitoUser)
    });
  }

  public logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('loggedIn');
    return this.http.delete(this.sessionsUrl);
  }

  public isLoggedIn() {
    this.loggedIn.next(localStorage.getItem('loggedIn') === '1');
    return this.loggedIn.asObservable();
  }

  createObaSession(token: any) {
    console.log('getting oba session');
    return this.http.post(this.sessionsUrl, token, {headers: new HttpHeaders({Host: AppConstants.HOST}), withCredentials: true});
  }

  private async handleError() {
    console.log('error!');
  }

  public setLoggedIn(b: boolean) {
    this.loggedIn.next(true);
    localStorage.setItem('loggedIn', '1');
  }

}
