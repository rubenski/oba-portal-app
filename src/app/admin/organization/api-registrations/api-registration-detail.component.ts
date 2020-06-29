import {Component, OnInit} from '@angular/core';
import {ApiRegistrationService} from '../../../api.registration.service';
import {ApiService} from '../../../api.service';
import {ActivatedRoute} from '@angular/router';
import {Api} from './api';
import {ApiRegistration} from './api.registration';
import {ApiRegistrationFormUtil, FormAndFields} from './registration.form.util';
import {FieldDefinition} from './field.definition';

@Component({
  templateUrl: './api-registration-detail.component.html'
})
export class ApiRegistrationDetailComponent implements OnInit {

  registrationId: string = this.route.snapshot.paramMap.get('apiRegistrationId');
  api: Api;
  apiRegistration: ApiRegistration;
  formAndFields: FormAndFields;
  stepNr: number;
  globalError: string;
  globalSuccess: string;

  constructor(private apiRegistrationService: ApiRegistrationService,
              private apiService: ApiService,
              private route: ActivatedRoute) {
  }

  // TODO: turn this nested mess into proper RxJs approach
  ngOnInit(): void {
    const formUtil = new ApiRegistrationFormUtil();
    this.apiRegistrationService.findRegistration(this.registrationId).subscribe(registration => {
      this.apiRegistration = registration;
      this.apiRegistrationService.findUpdateRegistrationStep(this.registrationId).subscribe(
        step => {
          this.stepNr = step.stepNr;
          this.formAndFields = formUtil.stepsToFormAndFields(step);
          this.apiService.findOne(this.apiRegistration.apiId).subscribe(api => {
            this.api = api;
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

  submit() {
    const formUtil = new ApiRegistrationFormUtil();
    const submittedFormValues = formUtil.getSubmittedFormValues(this.formAndFields, this.stepNr);
    this.apiRegistrationService.submitUpdateRegistrationStep(submittedFormValues, this.apiRegistration.id).subscribe(
      result => {
        this.globalSuccess = 'Organization info saved';
      }, error => {
        this.globalError = 'An error occurred';
      });
  }

  setEditable(field: FieldDefinition) {
    field.secret = true;
  }
}
