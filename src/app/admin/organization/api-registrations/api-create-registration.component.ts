import {Component, OnInit} from '@angular/core';
import {ApiRegistrationService} from '../../../api.registration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiRegistrationStepDefinition} from './api.registration.step.definition';
import {ApiService} from '../../../api.service';
import {ApiRegistrationFormUtil, FormAndFields} from './registration.form.util';
import {OrganizationService} from '../../../organization.service';
import {ApiWithRegistrations} from './api.with.registrations';

@Component({
  templateUrl: './api-create-registration.component.html'
})
export class ApiCreateRegistrationComponent implements OnInit {

  apiId: string = this.route.snapshot.paramMap.get('apiId');
  apiRegistrations: ApiWithRegistrations;
  api: ApiWithRegistrations;
  currentStep: ApiRegistrationStepDefinition;
  formAndFields: FormAndFields;
  organizationComplete: boolean;
  render: boolean; // Prevents the 'incomplete organization' warning from appearing briefly before the form is loaded
  globalError: string;

  constructor(private apiRegistrationService: ApiRegistrationService,
              private apiService: ApiService,
              private organizationService: OrganizationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const formUtil = new ApiRegistrationFormUtil();
    this.apiService.findOneApiWithCountryDataProvidersAndRegistrations(this.apiId).subscribe(api => {
      this.api = api;
      this.organizationService.completenessReport().subscribe(
        report => {
          this.organizationComplete = report.signingCertificateExists && report.transportCertificateExists
            && report.redirectUrl && report.organizationFieldsComplete;
          this.render = true;
          if (this.organizationComplete) {
            this.apiRegistrationService.findRegistrationSteps(this.apiId).subscribe(steps => {
                this.currentStep = steps.currentStep;
                this.formAndFields = formUtil.stepsToFormAndFields(this.currentStep);
              },
              error => {
                console.log(error);
              });
          }
        });
    }, error => {
      console.log(error);
    });
  }

  submit() {
    this.globalError = null;
    const formUtil = new ApiRegistrationFormUtil();
    this.apiRegistrationService.submitRegistrationStep(formUtil.getSubmittedFormValues(this.formAndFields, this.currentStep.stepNr),
      this.apiId)
      .subscribe(result => {
        this.router.navigate(['admin/organization/api-registrations'], {queryParams: {apiId: this.apiId}});
      }, error => {
        if (error.error.code === 'RegistrationFieldsException') {
          this.globalError = error.error.message;
        } else {
          this.globalError = 'An error occurred';
        }
      });
  }
}
