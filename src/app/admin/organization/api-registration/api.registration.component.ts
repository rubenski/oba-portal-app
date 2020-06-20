import {Component, OnInit} from '@angular/core';
import {ApiRegistrationService} from '../../../api.registration.service';
import {ActivatedRoute} from '@angular/router';
import {ApiRegistration} from './api.registration';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
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

  addCheckBoxesControl(value, minSelected: number) {
    this.getFields().push(this.fb.array(value, minSelectedCheckboxes(minSelected)));
  }

  addSelectListControl(value, required: boolean) {
    this.getFields().push(this.fb.control(value, selectListValidator(required)));
  }

  addTextInputControl(value, required: boolean, minLength: number, maxLength: number) {
    this.getFields().push(this.fb.control(value, textInputValidator(required, minLength, maxLength)));
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
                if (f.type === 'CHECKBOXES') {
                  const checkBoxes = [];
                  f.checkBoxValues.forEach(cbv => checkBoxes.push(this.fb.control(true)));
                  this.addCheckBoxesControl(checkBoxes, 1);
                } else if (f.type === 'SELECT') {
                  this.addSelectListControl(f.value, f.required);
                } else if (f.type === 'TEXT') {
                  this.addTextInputControl(f.value, f.required, f.minLength, f.maxLength);
                } else {
                  this.addControlToFormGroup(f.value);
                }

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
    console.log(this.form.value);
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

function selectListValidator(required: boolean) {
  const validator: ValidatorFn = (formControl: FormControl) => {
    const value = formControl.value;
    if (!value && required === true) {
      return {required: true};
    }
    return null;
  };
  return validator;
}

function textInputValidator(required: boolean, minLength: number, maxLength: number) {
  const validator: ValidatorFn = (formControl: FormControl) => {
    const value = formControl.value;
    if (!value && required === true) {
      console.log('false1');
      return {require: true};
    }
    if (minLength && value && value.length < minLength) {
      console.log('false2');
      return {minLength: true};
    }
    if (maxLength && value && value.length > maxLength) {
      console.log('false3');
      return {maxLength: true};
    }
    console.log('OK');
    return null;
  };

  return validator;
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // sum the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);
    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : {required: true};
  };

  return validator;
}

