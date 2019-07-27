import {Injectable} from '@angular/core';
import {CognitoUserPool} from 'amazon-cognito-identity-js';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {AppConstants} from './app.constants';

/**
 * Code taken from https://github.com/awslabs/aws-cognito-angular-quickstart
 */

@Injectable()
export class CognitoUtil {

  public static _POOL_DATA: any = {
    UserPoolId: AppConstants.AWS_OBA_USER_POOL_ID,
    ClientId: AppConstants.AWS_COGNITO_CLIENT_ID
  };

  getUserPool(): CognitoUserPool {
    return new CognitoUserPool(CognitoUtil._POOL_DATA);
  }

  getCurrentUser(): CognitoUser {
    return this.getUserPool().getCurrentUser();
  }
}
