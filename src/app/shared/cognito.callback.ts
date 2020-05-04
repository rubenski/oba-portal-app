import {CognitoUser} from 'amazon-cognito-identity-js';


export interface CognitoCallback {

  handleMFASetup(challengeName: any, challengeParameters: any, cognitoUser: CognitoUser);

  handleTotpRequired(challengeName, challengeParameters, cognitoUser: CognitoUser);

  handleLoginError(error, username);
}
