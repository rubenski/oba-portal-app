import {Component, OnInit} from '@angular/core';
import {ApiRegistrationService} from '../../../api.registration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiRegistration} from './api.registration';
import {ApiRegistrationStepDefinition} from './api.registration.step.definition';
import {ApiService} from '../../../api.service';
import {Api} from './api';
import {ApiRegistrationFormUtil, FormAndFields} from './registration.form.util';

@Component({
  templateUrl: './api-create-registration.component.html'
})
export class ApiCreateRegistrationComponent implements OnInit {

  apiId: string = this.route.snapshot.paramMap.get('apiId');
  apiRegistrations: ApiRegistration[];
  api: Api;
  currentStep: ApiRegistrationStepDefinition;
  formAndFields: FormAndFields;

  constructor(private apiRegistrationService: ApiRegistrationService,
              private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const formUtil = new ApiRegistrationFormUtil();
    this.apiService.findOne(this.apiId).subscribe(api => {
      this.api = api;
      this.apiRegistrationService.findRegistrationsForApi(this.apiId).subscribe(registrations => {
        console.log(registrations);
        if (registrations.length === 0) {
          console.log('No existing registrations found');
          this.apiRegistrationService.findRegistrationSteps(this.apiId).subscribe(steps => {
              this.currentStep = steps.currentStep;
              this.formAndFields = formUtil.stepsToFormAndFields( this.currentStep);
            },
            error => {
              console.log(error);
            });
        } else {
          this.apiRegistrations = registrations;
        }
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  submit() {
    const formUtil = new ApiRegistrationFormUtil();
    console.log(this.formAndFields.form.value);
    this.apiRegistrationService.submitRegistrationStep(formUtil.getSubmittedFormValues(this.formAndFields, this.currentStep.stepNr),
      this.apiId)
      .subscribe(result => {
        this.router.navigate(['admin/organization/api-registrations'], {queryParams: {apiId: this.apiId}});
      }, error => {
        console.log(error);
      });
  }
}
