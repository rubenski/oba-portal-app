import {Component} from '@angular/core';
import {CognitoUtil} from '../cognito.util';
import {LoginService} from '../login.service';
import {CognitoCallback} from '../shared/cognito.callback';
import {CognitoUser, CognitoUserPool, CognitoUserSession, ICognitoStorage, ICognitoUserData} from 'amazon-cognito-identity-js';
import * as QRCode from 'qrcode';
import {DomSanitizer} from '@angular/platform-browser';

export class Credentials {
  username: string;
  password: string;
}

export class UD implements ICognitoUserData {


  Pool: CognitoUserPool;
  Storage: ICognitoStorage;
  Username: string;


  constructor(Pool: CognitoUserPool, Username: string) {
    this.Pool = Pool;
    this.Username = Username;
  }
}

export class MyCognitoUser extends CognitoUser {

  constructor(data: ICognitoUserData, private cognitoUser: CognitoUser) {
    super(data);
  }

  getSignInUserSession(): CognitoUserSession | null {
    return this.cognitoUser.getSignInUserSession();
  }

  getUsername(): string {
    return 'rubenski@gmail.com';
  }


  getSession(callback: Function): any {
    return this.cognitoUser.getSession(callback);
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements CognitoCallback {

  constructor(private cognito: CognitoUtil, private loginService: LoginService, private sanitizer: DomSanitizer) {
  }

  public globalError: string;
  public credentials: Credentials = new Credentials();
  public image;
  public mfaInput;
  public totp: string;
  public cognitoUser: CognitoUser;


  onSubmitLogin() {
    this.loginService.authenticate(this.credentials, this);

  }

  processCallback(message: string, result: any): void {
    console.log(message);
  }

  onSubmitMfaInitialChallenge() {
    this.cognitoUser.verifySoftwareToken(this.totp, 'My TOTP device', {
      onSuccess: session => {},
      onFailure: err => {}
    });
  }

  onSubmitMfa()  {
    this.cognitoUser.sendMFACode(this.totp, {
      onSuccess: session => { console.log(session); },
      onFailure: err => console.log(err)
    });
  }

  handleMFAStep(challengeName: any, challengeParameters: any, param3: (confirmationCode: string) => void): void {
    console.log(challengeName);
    console.log(challengeParameters);
    console.log(param3);
  }

  handleMFASetup(challengeName: any, challengeParameters: any, cognitoUser: CognitoUser) {
    this.cognitoUser = cognitoUser;

    cognitoUser.associateSoftwareToken({
      associateSecretCode: (secretCode: string) => {


        QRCode.toDataURL(challengeName, (err, url) => {
          this.image = this.sanitizer.bypassSecurityTrustUrl(url);
        });
        console.log(secretCode);
        this.mfaInput = true;
        this.cognitoUser = cognitoUser;
      },
      onFailure: (err: any) => {
        alert(err);
      }
    });
  }

}
