import {Component, OnInit} from '@angular/core';
import {ApiRegistrationService} from '../../../api.registration.service';
import {ApiService} from '../../../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiRegistration} from './api.registration';
import {ApiRegistrationFormUtil, FormAndFields} from './registration.form.util';
import {ApiWithRegistrations} from './api.with.registrations';

@Component({
  templateUrl: './api-registration-detail.component.html'
})
export class ApiRegistrationDetailComponent implements OnInit {

  registrationId: string = this.route.snapshot.paramMap.get('apiRegistrationId');
  api: ApiWithRegistrations;
  numberOfConnections: number;
  apiRegistration: ApiRegistration;
  formAndFields: FormAndFields;
  stepNr: number;
  globalError: string;
  globalSuccess: string;

  constructor(private apiRegistrationService: ApiRegistrationService,
              private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  // TODO: turn this nested mess into proper RxJs approach
  ngOnInit(): void {
    this.init();
  }

  submit() {
    const formUtil = new ApiRegistrationFormUtil();
    const submittedFormValues = formUtil.getSubmittedFormValues(this.formAndFields, this.stepNr);
    this.apiRegistrationService.submitUpdateRegistrationStep(submittedFormValues, this.apiRegistration.id).subscribe(
      result => {
        this.globalSuccess = 'Registration updated';
        // Reload the data here so that any unlocked secret input fields will go back to being locked
        this.init();
      }, error => {
        this.globalError = 'An error occurred';
      });
  }

  delete() {
    if (confirm('Are you sure you want to delete this registration?')) {
      this.apiRegistrationService.deleteRegistration(this.apiRegistration.id).subscribe(result => {
        this.router.navigate(['admin/organization/api-registrations'], {queryParams: {apiId: this.apiRegistration.apiId}});
      });
    }
  }

  toggle(i: number) {
    const control = this.formAndFields.form.controls.all.get('' + i);
    control.setValue('');
  }

  init() {
    const formUtil = new ApiRegistrationFormUtil();
    this.apiRegistrationService.findRegistration(this.registrationId).subscribe(registration => {
      this.apiRegistration = registration;
      this.apiRegistrationService.findUpdateRegistrationStep(this.registrationId).subscribe(
        step => {
          this.stepNr = step.stepNr;
          this.formAndFields = formUtil.stepsToFormAndFields(step);
          this.apiService.findOneApiWithCountryDataProvidersAndRegistrations(this.apiRegistration.apiId).subscribe(api => {
            this.api = api;
            const result = api.apiRegistrations.filter(ar => ar.id === this.apiRegistration.id)[0];
            this.numberOfConnections = result.nrOfConnections;
          }, error => {
            console.log(error);
          });
        }, error => {
          console.log(error);
        });
    }, error => {
      console.log(error);
    });
  }
}
