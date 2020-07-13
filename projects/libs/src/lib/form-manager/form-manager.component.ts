import { Component, OnInit, Input } from '@angular/core';
import { ControlItem, ControlType, ControlValidator } from './form-manager.model';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
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

      if ([ControlType.CheckBox, ControlType.RadioButtonList, ControlType.SlideChecked].includes(controlType)) {
        value = value ? value : false;
      }

      return { ...obj, [id]: [{ value, disabled: !!disabled }, this.getValidMapTable(controlType, validatorList) || []] };

    }, {});

    this.form = this.fb.group(controlsConfig);
    this._dataSource = v;
  }
  private _dataSource: Array<ControlItem<ControlType>>;

  form: FormGroup;
  readonly cType = ControlType;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { }


  /**
   * [轉換黑盒子]
   * 由開發人員定義客製化調整定義轉換
   *
   * @export
   * @param string validKey 驗證規則的 key
   * @param any param 要給予驗證規則用的參數
   * @returns ValidatorFn 驗證規則物件
   */
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


  /** 字串輸入 相關驗證規則 */
  getKeywordInputValidators(validatorList: ControlValidator[ControlType.KeywordInput]): ValidatorFn[] {

    const validators = [];

    if (validatorList.required) {
      validators.push(Validators.required);
    }

    if (validatorList.minlength) {
      validators.push(Validators.minLength(validatorList.minlength.value));
    }

    if (validatorList.maxlength) {
      validators.push(Validators.maxLength(validatorList.maxlength.value));
    }

    if (validatorList.email) {
      validators.push(Validators.email);
    }

    return validators;
  }

  /** 勾選清單 相關驗證規則 */
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
