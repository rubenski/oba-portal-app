import {Component, OnInit} from '@angular/core';
import {ApiRegistrationService} from '../../../api.registration.service';
import {ActivatedRoute} from '@angular/router';
import {ApiRegistration} from './api.registration';
import {ApiRegistrationSteps} from './api.registration.steps';
import {Form, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {FieldDefinition} from './field.definition';

@Component({
  templateUrl: './api-registration.component.html'
})
export class ApiRegistrationComponent implements OnInit {

  apiId: string = this.route.snapshot.paramMap.get('apiId');
  apiRegistrations: ApiRegistration[];
  apiRegistrationSteps: ApiRegistrationSteps;
  form: FormGroup;

  constructor(private apiRegistrationService: ApiRegistrationService, private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  getFields() {
    return this.form.get('all') as FormArray;
  }

  addControlToFormGroup(value) {
    this.getFields().push(this.fb.control(value ? value : ''));
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      all: this.fb.array([])
    });

    this.apiRegistrationService.findRegistrationsForApi(this.apiId).subscribe(registrations => {
      console.log(registrations);
      if (registrations.length === 0) {
        console.log('No existing registrations found');
        this.apiRegistrationService.findRegistrationSteps(this.apiId).subscribe(steps => {
            steps.currentStep.formDefinition.fieldLayoutGroups.forEach(flg => flg.fields.forEach(
              f => {
                this.addControlToFormGroup(f);
              }
            ));
            this.apiRegistrationSteps = steps;
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
  }


}
