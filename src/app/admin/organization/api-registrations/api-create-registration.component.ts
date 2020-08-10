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
          this.organizationComplete = report.validSigningCertificate && report.validTransportCertificate
            && report.redirectUrl && report.organizationFieldsComplete;
          this.render = true;
          if (this.organizationComplete) {
            this.apiRegistrationService.findRegistrationsForApi(this.apiId).subscribe(registrations => {
              this.apiRegistrationService.findRegistrationSteps(this.apiId).subscribe(steps => {
                  this.currentStep = steps.currentStep;
                  this.formAndFields = formUtil.stepsToFormAndFields(this.currentStep);
                },
                error => {
                  console.log(error);
                });
            }, error => {
              console.log(error);
            });
          }
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
