import {Component, OnInit} from '@angular/core';
import {ApiRegistrationService} from '../../../api.registration.service';
import {ApiService} from '../../../api.service';
import {ActivatedRoute} from '@angular/router';
import {Api} from './api';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiRegistration} from './api.registration';
import {FieldDefinition} from './field.definition';

@Component({
  templateUrl: './api-registration-detail.component.html'
})
export class ApiRegistrationDetailComponent implements OnInit {

  registrationId: string = this.route.snapshot.paramMap.get('apiRegistrationId');
  api: Api;
  form: FormGroup;
  apiRegistration: ApiRegistration;
  fieldDefinitions: FieldDefinition[];

  constructor(private apiRegistrationService: ApiRegistrationService,
              private apiService: ApiService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {

  }

  // TODO: turn this nested mess into proper RxJs approach
  ngOnInit(): void {

    this.form = this.fb.group({
      all: this.fb.array([])
    });

    this.apiRegistrationService.findRegistration(this.registrationId).subscribe(registration => {
      this.apiRegistration = registration;
      this.apiRegistrationService.findUpdateRegistrationStep(this.registrationId).subscribe(
        step => {
          // TODO: getting steps here as well. You should just ditch the field layout groups
          this.fieldDefinitions = step.formDefinition.fieldLayoutGroups.flatMap(f => f.fields);
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


  }
}
