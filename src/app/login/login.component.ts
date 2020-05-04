import {Component} from '@angular/core';
import {CognitoUtil} from '../cognito.util';
import {LoginService} from './login.service';
import {CognitoCallback} from '../shared/cognito.callback';
import {CognitoUser} from 'amazon-cognito-identity-js';
import * as QRCode from 'qrcode';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

export class Credentials {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements CognitoCallback {

  constructor(private cognito: CognitoUtil, private loginService: LoginService, private sanitizer: DomSanitizer, private router: Router) {
  }

  public globalError: string;
  public credentials: Credentials = new Credentials();
  public image;
  public cognitoUser: CognitoUser;
  public showMfa;

  onSubmitLogin() {
    this.loginService.login(this.credentials, this);
  }

  handleMFASetup(challengeName: any, challengeParameters: any, cognitoUser: CognitoUser) {
    console.log('handle mfa setup');
    this.cognitoUser = cognitoUser;

    cognitoUser.associateSoftwareToken({
      associateSecretCode: (secretCode: string) => {
        const url = 'otpauth://totp/OBA:' + cognitoUser.getUsername() + '?secret=' + secretCode;
        QRCode.toDataURL(url, (err, dataUrl) => {
          this.image = this.sanitizer.bypassSecurityTrustUrl(dataUrl);
        });
        this.cognitoUser = cognitoUser;
      },
      onFailure: (err: any) => {
        alert(err);
      }
    });
  }

  handleTotpRequired(challengeName, challengeParameters, cognitoUser: CognitoUser) {
    console.log('handle totp required');
    this.cognitoUser = cognitoUser;
    this.showMfa = true;
  }

  handleLoginError(error, username) {
    if (error.code === 'UserNotConfirmedException') {
      console.log('user not confirmed ' + username);
      this.router.navigate(['/register/verify/' + btoa(username)]);
    }
    this.globalError = error.message;
  }


}
