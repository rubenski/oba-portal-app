import {LabelExplanation} from './label.explanation';
import {LabelValue} from './label.value';
import {CheckBoxesMinSelectedValidator} from './checkbox.min.selected.validator';


export class FieldDefinition {
  key: string;
  labelExplanation: LabelExplanation;
  checkBoxValues: LabelValue[];
  radioButtonValues: LabelValue[];
  checkBoxesMinSelectedValidator: CheckBoxesMinSelectedValidator;
  required: boolean;
  description: string;
  values: string[];
  options: LabelValue[];
  regex: string;
  minLength: number;
  maxLength: number;
  type: string;
  secret: boolean;
  rows: string;

  editable = false;
}
