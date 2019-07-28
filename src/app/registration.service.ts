import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {AppConstants} from './app.constants';
import {Registration} from './registration';
import {MessageService} from './message.service';
import {CognitoUtil} from './cognito.util';
import {EmailValidator} from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private registrationServiceUrl = AppConstants.API_HOST + '/registrations/';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private cognitoUtil: CognitoUtil) {
  }

  addRegistration1(registration: Registration, callback): any {


    const userPool = this.cognitoUtil.getUserPool();
    console.log(userPool);
    const currentUser = userPool.getCurrentUser();
    console.log(currentUser);


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

    userPool.signUp(registration.dqwuh, registration.password, attributeList, null, callback);


  }

  private log(message: string) {
    this.messageService.add(`CustomerService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
