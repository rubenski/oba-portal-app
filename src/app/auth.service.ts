import {CognitoUser} from 'amazon-cognito-identity-js';

export class AuthService {
  public loggedIn: boolean;
  public cognitoUser: CognitoUser;
}
