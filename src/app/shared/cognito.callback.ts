import {CognitoUser} from 'amazon-cognito-identity-js';


export interface CognitoCallback {
  processCallback(message: string, result: any): void;

  handleMFAStep(challengeName: any, challengeParameters: any, param3: (confirmationCode: string) => void): void;

  handleMFASetup(challengeName: any, challengeParameters: any, cognitoUser: CognitoUser);
}
