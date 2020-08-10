import {Injectable} from '@angular/core';
import {Credentials} from './login.component';
import {CognitoCallback} from '../shared/cognito.callback';
import {AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';
import {CognitoUtil} from '../cognito.util';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AppConstants} from '../app.constants';
import {BehaviorSubject, Observable} from 'rxjs';
import {Session} from './session';
import {Router} from '@angular/router';


@Injectable()
export class LoginService {

  private sessionsUrl = environment.obaPortalBackendHostName + '/sessions/';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private cognito: CognitoUtil, private http: HttpClient, private router: Router) {

  }

  login(credentials: Credentials, cognitoCallback: CognitoCallback) {

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
      onFailure: err => cognitoCallback.handleLoginError(err, credentials.username),
      mfaSetup: (challengeName: any, challengeParameters: any) => cognitoCallback.handleMFASetup(challengeName, challengeParameters, cognitoUser),
      mfaRequired: (challengeName, challengeParameters) => {
        console.log('method not implemented');
      },
      totpRequired: (challengeName, challengeParameters) => cognitoCallback.handleTotpRequired(challengeName, challengeParameters, cognitoUser)
    });
  }

  public logout(redirectTo) {
    console.log('logging out');
    this.loggedIn.next(false);
    localStorage.removeItem('loggedInOrganization');
    this.router.navigate([redirectTo]);
    this.http.delete(this.sessionsUrl);
  }

  public isLoggedIn() {
    if (localStorage.getItem('loggedInOrganization') != null) {
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }

  public getServerSession() {
    return this.http.get<Session>(this.sessionsUrl, {headers: new HttpHeaders({Host: AppConstants.HOST}), withCredentials: true});
  }

  createObaSession(token: any): Observable<Session> {
    console.log('getting oba session');
    return this.http.post<Session>(this.sessionsUrl, token, {headers: new HttpHeaders({Host: AppConstants.HOST}), withCredentials: true});
  }

  public setLoggedIn(session: Session) {
    this.loggedIn.next(true);
    localStorage.setItem('loggedInOrganization', session.organizationId);
  }
}
