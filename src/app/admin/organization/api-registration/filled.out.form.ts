

export class FilledOutForm {
  stepNr: number;
  values: KeyValue[] = [];
}

export class KeyValue {

  constructor(key: string, values: string[]) {
    this.key = key;
    this.values = values;
  }

  key: string;
  values: string[];
}
