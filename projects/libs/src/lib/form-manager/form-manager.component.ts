import { Component, OnInit, Input } from '@angular/core';
import { ControlItem, ControlType, ControlValidator } from './form-manager.model';
import { FormGroup, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { CustomValidators } from './validators/validation.module';

@Component({
  selector: 'lib-form-manager',
  templateUrl: './form-manager.component.html',
  styleUrls: ['./form-manager.component.scss']
})
export class FormManagerComponent implements OnInit {

  @Input()
  get dataSource() {
    return this._dataSource;
  }
  set dataSource(v: Array<ControlItem<ControlType>>) {

    const controlsConfig = v.reduce((obj, { id, disabled, value, controlType, validatorList }) => {

      // return { ...obj, [id]: [{ value, disabled }, this.getValidMapTable(controlType, validatorList) || []] };

      return { ...obj, [id]: this.fb.control({ value, disabled }, this.getValidMapTable(controlType, validatorList) || []) };

    }, {});

    this.form = this.fb.group(controlsConfig);
    this._dataSource = v;
  }
  private _dataSource: Array<ControlItem<ControlType>>;

  form: FormGroup;

  readonly cType = ControlType;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  getValidMapTable(controlType: ControlType, validatorList: any): ValidatorFn[] {
    if (validatorList) {
      switch (controlType) {
        case ControlType.KeywordInput: {
          return this.getKeywordInputValidators(validatorList);
        }
        case ControlType.CheckBoxList: {
          return this.getCheckBoxListValidators(validatorList);
        }
        default:
          console.log('controlType not defined -> ', controlType);
          return undefined;
      }
    }
  }

  getKeywordInputValidators(validatorList: ControlValidator[ControlType.KeywordInput]): ValidatorFn[] {

    const validators = [];

    if (validatorList.required) {
      validators.push(Validators.required);
    }

    if (validatorList.minlength) {
      validators.push(Validators.minLength(validatorList.minlength.value));
    }

    if (validatorList.email) {
      validators.push(Validators.email);
    }

    return validators;
  }

  getCheckBoxListValidators(validatorList: ControlValidator[ControlType.CheckBoxList]): ValidatorFn[] {
    const { maxlength, minlength } = validatorList;
    const validators = [];

    if (maxlength) {
      validators.push(CustomValidators.maxArray(maxlength.value));
    }

    if (minlength) {
      validators.push(CustomValidators.minArray(minlength.value));
    }

    return validators;
  }

}
