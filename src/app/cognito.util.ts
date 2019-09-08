import {Injectable} from '@angular/core';
import {CognitoUserPool} from 'amazon-cognito-identity-js';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {environment} from '../environments/environment';

/**
 * Code taken from https://github.com/awslabs/aws-cognito-angular-quickstart
 */

@Injectable()
export class CognitoUtil {

  public static _POOL_DATA: any = {
    UserPoolId: environment.obaCognitoUserPoolId,
    ClientId: environment.awsCognitoClientId
  };

  getUserPool(): CognitoUserPool {
    return new CognitoUserPool(CognitoUtil._POOL_DATA);
  }

  getCurrentUser(): CognitoUser {
    return this.getUserPool().getCurrentUser();
  }
}
