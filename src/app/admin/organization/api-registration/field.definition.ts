import {LabelExplanation} from './label.explanation';
import {CheckBoxValue} from './checkbox.value';
import {LabelValue} from './label.value';


export class FieldDefinition {
  key: string;
  labelExplanation: LabelExplanation;
  buttonText: string;
  values: CheckBoxValue[];
  required: boolean;
  description: string;
  value: string;
  options: LabelValue[];
  regex: string;
  minLength: number;
  maxLength: number;
  type: string;
}
