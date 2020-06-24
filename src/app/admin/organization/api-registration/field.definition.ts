import {LabelExplanation} from './label.explanation';
import {CheckBoxValue} from './checkbox.value';
import {LabelValue} from './label.value';
import {CheckBoxesMinSelectedValidator} from './checkbox.min.selected.validator';


export class FieldDefinition {
  key: string;
  labelExplanation: LabelExplanation;
  buttonText: string;
  checkBoxValues: CheckBoxValue[];
  checkBoxesMinSelectedValidator: CheckBoxesMinSelectedValidator;
  required: boolean;
  description: string;
  values: string[];
  options: LabelValue[];
  regex: string;
  minLength: number;
  maxLength: number;
  type: string;
}
