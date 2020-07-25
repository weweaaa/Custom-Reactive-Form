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

    // ====== reduce 作法 ======
    // const controlsConfig = v.reduce((obj, { id, disabled, defaultValue, controlType, validatorList }) => {
    // return { ...obj, [id]: this.fb.control({ defaultValue, disabled }, this.getValidMapTable(controlType, validatorList) || []) };
    // }, {});

    // 讓 tslint 忽略下一行警告的寫法
    // tslint:disable-next-line

    // ====== foreach 作法 ======
    const controlsConfig = {};
    v.forEach((obj) => {
      controlsConfig[obj.id] = [{
        value: obj.defaultValue,
        disabled: obj.disabled
      }, this.getValidMapTable(obj.controlType, obj.validatorList) || []];
    });

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
        case ControlType.JiaInput: {
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

  getKeywordInputValidators(validatorList: ControlValidator[ControlType.JiaInput]): ValidatorFn[] {

    const validators = [];

    if (validatorList.required) {
      validators.push(Validators.required);
    }

    if (validatorList.minlength) {
      validators.push(Validators.minLength(validatorList.minlength.length));
    }

    if (validatorList.maxlength) {
      validators.push(Validators.maxLength(validatorList.maxlength.length));
    }

    if (validatorList.email) {
      validators.push(Validators.email);
    }

    return validators;
  }

  getCheckBoxListValidators(validatorList: ControlValidator[ControlType.CheckBoxList]): ValidatorFn[] {
    const validators = [];

    if (validatorList.maxArray) {
      validators.push(CustomValidators.maxArray(validatorList.maxArray.length));
    }

    if (validatorList.minArray) {
      validators.push(CustomValidators.minArray(validatorList.minArray.length));
    }

    return validators;
  }

}
