import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {FieldDefinition} from './field.definition';
import {FilledOutForm, KeyValue} from './filled.out.form';
import {ApiRegistrationStepDefinition} from './api.registration.step.definition';
import {throwError} from 'rxjs';


export class ApiRegistrationFormUtil {

  private fb = new FormBuilder();

  constructor() {
  }

  private textInputValidator(required: boolean, minLength: number, maxLength: number) {
    const validator: ValidatorFn = (formControl: FormControl) => {
      const value = formControl.value;

      if (!value && required === true) {
        return {require: true};
      }
      if (minLength && value && value.length < minLength) {
        return {minLength: true};
      }
      if (maxLength && value && value.length > maxLength) {
        return {maxLength: true};
      }

      return null;
    };

    return validator;
  }

  private selectListValidator(required: boolean) {
    const validator: ValidatorFn = (formControl: FormControl) => {
      const value = formControl.value;
      if (!value && required === true) {
        return {required: true};
      }
      return null;
    };
    return validator;
  }

  private minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // sum the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);
      // if the total is not greater than the minimum, return the error message
      return !formArray.dirty || totalSelected >= min ? null : {required: true};
    };

    return validator;
  }

  stepsToFormAndFields(step: ApiRegistrationStepDefinition): FormAndFields {

    const fieldDefinitions: FieldDefinition[] = [];
    const form = this.fb.group({
      all: this.fb.array([])
    });

    step.formDefinition.fieldLayoutGroups.forEach(flg => flg.fields.forEach(
      f => {
        if (f.type === 'CHECKBOXES') {
          const checkBoxes = [];
          f.checkBoxValues.forEach(cbv => checkBoxes.push(this.fb.control(f.values ? f.values.includes(cbv.value) : false)));
          this.addCheckBoxesControl(form, this.fb, checkBoxes, 1);
        } else if (f.type === 'SELECT') {
          this.addSelectListControl(form, this.fb, f.values ? f.values[0] : null, f.required);
        } else if (f.type === 'TEXT') {
          this.addTextInputControl(form, this.fb, f.values ? f.values[0] : null, f.required, f.minLength, f.maxLength);
        } else {
          this.addControlToFormGroup(form, this.fb, f.values ? f.values[0] : null, f.required, f.minLength, f.maxLength);
        }

        /**
         * Pushing fields onto a separate collection, leaving behind the fieldLayoutGroup subdivision of fields. The layout group
         * approach doesn't work with Angular's FormArray, because it will result in a nested loop in the template
         * and I am no longer able to use the iteration index to assign a unique index to each [formControlName].
         *
         * It may be worth considering a different approach to dynamic forms in the future altogether.
         * Layout Groups are not possible with FormArray and the way in which data is sent from the form for checkboxes, as an array
         * of true/false values is not ideal.
         */
        fieldDefinitions.push(f);
      }
    ));

    return new FormAndFields(form, fieldDefinitions);
  }

  /**
   * The array of submitted form values has the same order and size as the field definitions array. We use this fact to
   * link submitted values back to the field
   */
  getSubmittedFormValues(formAndFields: FormAndFields, stepNumber: number): FilledOutForm {
    const filledOutForm = new FilledOutForm();
    let i = 0;
    formAndFields.fieldDefinitions.forEach(f => {
      const submittedValues = formAndFields.form.value.all[i];
      if (f.type === 'CHECKBOXES') {
        const selected = this.getSubmittedCheckBoxValues(f, submittedValues);
        filledOutForm.values.push(new KeyValue(f.key, selected));
      } else if (f.type === 'RADIO_BUTTONS') {
        const selected = this.getSubmittedRadioButtonValue(f, submittedValues);
        filledOutForm.values.push(new KeyValue(f.key, selected));
      } else {
        const val = [];
        val.push(submittedValues);
        filledOutForm.values.push(new KeyValue(f.key, val));
      }
      i++;
    });

    filledOutForm.stepNr = stepNumber;
    return filledOutForm;
  }


  /**
   * Radio buttons are returned as an array of elements containing either the selected value (a UUID in our case) or 'false'.
   * Since we want only a single value from the RADIO_BUTTON control we can immediately return the first value we find that is not 'false'.
   *
   * @param f
   * @param submittedValues
   * @private
   */
  private getSubmittedRadioButtonValue(f: FieldDefinition, submittedValues: any[]): string[] {
    for (const item of submittedValues) {
      if (item !== false) {
        return [item];
      }
    }
    throwError('Nothing was selected for RADIO_BUTTON form component');
  }

  // The Angular FormArray approach is not exactly pretty. We get a list of trues/falses with indexes which
  // we then need to turn into something the backend understands by linking the trues/falses
  // back to their original field definition and the actual checkbox values provided there
  // (redirect url ids for example). It works, but that's it.
  private getSubmittedCheckBoxValues(f: FieldDefinition, submittedValues: boolean[]): string[] {
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

  private getFields(form: FormGroup) {
    return form.get('all') as FormArray;
  }

  private addControlToFormGroup(form: FormGroup, fb: FormBuilder, values, required: boolean, minLength: number, maxLength: number) {
    this.getFields(form).push(fb.control(values, this.textInputValidator(required, minLength, maxLength)));
  }

  private addCheckBoxesControl(form: FormGroup, fb: FormBuilder, values, minSelected: number) {
    this.getFields(form).push(fb.array(values, this.minSelectedCheckboxes(minSelected)));
  }

  private addSelectListControl(form: FormGroup, fb: FormBuilder, values, required: boolean) {
    console.log(JSON.stringify(values) + ' : ' + required);
    this.getFields(form).push(fb.control(values, this.selectListValidator(required)));
  }

  private addTextInputControl(form: FormGroup, fb: FormBuilder, value, required: boolean, minLength: number, maxLength: number) {
    this.getFields(form).push(fb.control(value, this.textInputValidator(required, minLength, maxLength)));
  }
}

export class FormAndFields {

  constructor(form: FormGroup, fieldDefinitions: FieldDefinition[]) {
    this.form = form;
    this.fieldDefinitions = fieldDefinitions;
  }

  public form: FormGroup;
  public fieldDefinitions: FieldDefinition[];
}





