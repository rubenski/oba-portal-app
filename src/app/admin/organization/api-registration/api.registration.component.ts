import {Component, OnInit} from '@angular/core';
import {ApiRegistrationService} from '../../../api.registration.service';
import {ActivatedRoute} from '@angular/router';
import {ApiRegistration} from './api.registration';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {FieldDefinition} from './field.definition';
import {FilledOutForm, KeyValue} from './filled.out.form';
import {ApiRegistrationStepDefinition} from './api.registration.step.definition';
import {ApiService} from '../../../api.service';
import {Api} from './api';
import {RegistrationStatusRequest} from './registrationStatusRequest';

@Component({
  templateUrl: './api-registration.component.html'
})
export class ApiRegistrationComponent implements OnInit {

  apiId: string = this.route.snapshot.paramMap.get('apiId');
  apiRegistrations: ApiRegistration[];
  fieldDefinitions: FieldDefinition[] = [];
  form: FormGroup;
  render: boolean;
  api: Api;
  currentStep: ApiRegistrationStepDefinition;

  constructor(private apiRegistrationService: ApiRegistrationService,
              private apiService: ApiService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  getFields() {
    return this.form.get('all') as FormArray;
  }

  addControlToFormGroup(values) {
    this.getFields().push(this.fb.control(values));
  }

  addCheckBoxesControl(values, minSelected: number) {
    this.getFields().push(this.fb.array(values, minSelectedCheckboxes(minSelected)));
  }

  addSelectListControl(values, required: boolean) {
    this.getFields().push(this.fb.control(values, selectListValidator(required)));
  }

  addTextInputControl(value, required: boolean, minLength: number, maxLength: number) {
    this.getFields().push(this.fb.control(value, textInputValidator(required, minLength, maxLength)));
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      all: this.fb.array([])
    });

    this.apiService.findOne(this.apiId).subscribe(api => {
      this.api = api;
      this.apiRegistrationService.findRegistrationsForApi(this.apiId).subscribe(registrations => {
        console.log(registrations);
        if (registrations.length === 0) {
          console.log('No existing registrations found');
          this.apiRegistrationService.findRegistrationSteps(this.apiId).subscribe(steps => {
              this.currentStep = steps.currentStep;
              steps.currentStep.formDefinition.fieldLayoutGroups.forEach(flg => flg.fields.forEach(
                f => {
                  if (f.type === 'CHECKBOXES') {
                    const checkBoxes = [];
                    f.checkBoxValues.forEach(cbv => checkBoxes.push(this.fb.control(true)));
                    this.addCheckBoxesControl(checkBoxes, 1);
                  } else if (f.type === 'SELECT') {
                    this.addSelectListControl(f.values, f.required);
                  } else if (f.type === 'TEXT') {
                    this.addTextInputControl(f.values, f.required, f.minLength, f.maxLength);
                  } else {
                    this.addControlToFormGroup(f.values);
                  }

                  /**
                   * Pushing fields onto a separate collection, leaving behind the fieldLayoutGroup subdivision of fields. The layout group
                   * approach doesn't work with Angular's FormArray, because it will result in a nested loop in the template
                   * and I am no longer able to use the iteration index to assign a unique index to each [formControlName].
                   *
                   * It may be worth considering a different approach to dynamic forms in the future if you want to
                   * use the fieldLayoutGroup and represent these as subdivisions in the view using divs or fieldsets.
                   */
                  this.fieldDefinitions.push(f);
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

  setStatus(apiRegistrationId: string, status: string) {
    this.apiRegistrationService.setStatus(apiRegistrationId, status).subscribe(
      result => {
        console.log(result);
      },
      error => console.log(error));
  }

  getSubmittedFormValues(): FilledOutForm {
    const filledOutForm = new FilledOutForm();
    let i = 0;
    this.fieldDefinitions.forEach(f => {
      const submittedValues = this.form.value.all[i];
      if (submittedValues instanceof Array) {
        const selected = this.getSelectedFormArrayValues(f, submittedValues);
        filledOutForm.values.push(new KeyValue(f.key, selected));
      } else {
        const val = [];
        val.push(submittedValues);
        filledOutForm.values.push(new KeyValue(f.key, val));
      }
      i++;
    });

    filledOutForm.stepNr = this.currentStep.stepNr;
    return filledOutForm;
  }

  // The Angular FormArray approach is not exactly pretty. We get a list of trues/falses with indexes which
  // we then need to turn into something the backend understands by linking the trues/falses
  // back to the original field definition and the actual checkbox values provided there
  // (redirect url ids for example). It works, but that is all I can say about it
  getSelectedFormArrayValues(f: FieldDefinition, submittedValues: boolean[]): string[] {
    const selected = [];
    const checkBoxValues = f.checkBoxValues;
    for (let j = 0; j < checkBoxValues.length; j++) {
      const checkBoxValue = checkBoxValues[j];
      const submittedValue = submittedValues[j];
      if (submittedValue === true) {
        selected.push(checkBoxValue.value);
      }
    }
    return selected;
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

