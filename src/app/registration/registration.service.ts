import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Registration} from '../registration';
import {CognitoUtil} from '../cognito.util';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private customersUrl = environment.obaPortalBackendHostName + '/registrations/';

  constructor(
    private http: HttpClient,
    private cognitoUtil: CognitoUtil) {
  }

  registerWithCognitoUserPool(registration: Registration, callback): any {

    if (registration.companyLocation || registration.email) {
      return;
    }

    const userPool = this.cognitoUtil.getUserPool();
    const attributeList = [];

    const firstName = {
      Name: 'given_name',
      Value: registration.firstName
    };

    const lastName = {
      Name: 'family_name',
      Value: registration.lastName
    };

    const email = {
      Name: 'email',
      Value: registration.dqwuh
    };

    attributeList.push(firstName, lastName, email);

    // Register at Cognito user pool
    userPool.signUp(registration.dqwuh, registration.password, attributeList, null, callback);
  }

  registerWithOba(registration: Registration) {
    return this.http.post(this.customersUrl, registration, httpOptions);
  }

}
