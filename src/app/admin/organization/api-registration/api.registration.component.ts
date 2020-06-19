import {Component, OnInit} from '@angular/core';
import {ApiRegistrationService} from '../../../api.registration.service';
import {ActivatedRoute} from '@angular/router';
import {ApiRegistration} from './api.registration';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {FieldDefinition} from './field.definition';
import {FilledOutForm, KeyValue} from './filled.out.form';

@Component({
  templateUrl: './api-registration.component.html'
})
export class ApiRegistrationComponent implements OnInit {

  apiId: string = this.route.snapshot.paramMap.get('apiId');
  apiRegistrations: ApiRegistration[];
  fields: FieldDefinition[] = [];
  form: FormGroup;
  render: boolean;

  constructor(private apiRegistrationService: ApiRegistrationService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  getFields() {
    return this.form.get('all') as FormArray;
  }

  addControlToFormGroup(value) {
    this.getFields().push(this.fb.control(value));
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
                this.addControlToFormGroup(f.value);
                /**
                 * Pushing fields onto a separate collection, leaving behind the fieldLayoutGroup subdivision of fields. The layout group
                 * approach doesn't work with Angular's FormArray, because it will result in a nested loop in the template
                 * and I am no longer able to use the iteration index to assign a unique index to each [formControlName].
                 *
                 * It may be worth considering a different approach to dynamic forms in the future if you want to
                 * use the fieldLayoutGroup and represent these as subdivisions in the view using divs or fieldsets.
                 */
                this.fields.push(f);
              }
            ));
            this.render = true;
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

  submit() {

    this.apiRegistrationService.submitRegistrationStep(this.getSubmittedFormValues(), this.apiId).subscribe(result => {
      console.log(result);
    }, error => {
      console.log(error);
    });

  }

  getSubmittedFormValues(): FilledOutForm {
    const filledOutForm = new FilledOutForm();
    let i = 0;

    this.fields.forEach(f => {
      const submittedValue = this.form.value.all[i];
      if (submittedValue instanceof Array) {
        filledOutForm.values.push(new KeyValue(f.key, submittedValue));
      } else {
        const val = [];
        val.push(submittedValue);
        filledOutForm.values.push(new KeyValue(f.key, val));
      }
      i++;
    });

    return filledOutForm;
  }

}

