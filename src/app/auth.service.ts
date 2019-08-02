import {CognitoUser} from 'amazon-cognito-identity-js';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: boolean;
  public cognitoUser: CognitoUser;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  private sessionTokenUrl = '/session';

  registerCognitoSessionToken(cognitoSessionToken: string) {

  }
}
