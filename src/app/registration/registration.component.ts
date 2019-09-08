import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Registration} from '../registration';
import {RegistrationService} from './registration.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, AfterViewInit {

  @ViewChild('registrationForm', null) public registrationForm: NgForm;

  public display: string;
  public registration: Registration = new Registration();
  public globalError: string;

  constructor(private registrationService: RegistrationService, private router: Router, private route: ActivatedRoute) {
  }

  ngAfterViewInit() {
    this.display = 'none';
  }

  ngOnInit() {
    this.registrationForm.form.setErrors({});
  }

  onSubmitRegistration() {
    this.add();
  }

  add(): void {
    this.register();
  }

  register() {
    this.registrationService.registerWithCognitoUserPool(this.registration, (err, result) => {
      if (err) {
        const code = err.code;
        if (code === 'UsernameExistsException') {
          this.registrationForm.form.controls.dqwuh.setErrors({emailExists: true});
          this.registrationForm.form.controls.dqwuh.markAsTouched();
        } else {
          this.globalError = 'A technical error occurred';
        }
      } else {
        // Set the Cognito user id on the message for OBA
        // TODO: change to OAUTH2 in the future to avoid ending up with orphaned users in Cognito. See ideas.
        this.registration.cognitoUserId = result.userSub;
        this.registrationService.registerWithOba(this.registration).subscribe(registration => {
          this.router.navigate(['verify/' + btoa(result.user.username)], {relativeTo: this.route});
        }, error => {
          if (error.error.code === 'PRT003') {
            this.globalError = 'This email address has already been registered';
          } else {
            this.globalError = 'A technical error occurred';
          }
        });
      }
    });
  }
}

