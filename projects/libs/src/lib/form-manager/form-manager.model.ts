import { Validators } from '@angular/forms';

/** 目前支援的 FormControl 類型 */
export enum ControlType {
  /** 關鍵字 輸入框 */
  KeywordInput = 'KeywordInput',

  /** 勾選 選擇器 */
  CheckBox = 'CheckBox',
  /** 開關 選擇器 */
  SlideChecked = 'SlideChecked',

  /** 日期 選擇器 */
  DatePicker = 'DatePicker',

  /** 下拉式選單 選擇器 */
  DropDownList = 'DropDownList',
  /** 點選 選擇器 */
  RadioButtonList = 'RadioButtonList',

  /** 勾選清單 選擇器 */
  CheckBoxList = 'CheckBoxList',
}

/** Form Control 值的型別定義 */
export interface ControlValueType {
  [ControlType.KeywordInput]: string;

  [ControlType.CheckBox]: boolean;

  [ControlType.SlideChecked]: boolean;

  [ControlType.DatePicker]: string;

  [ControlType.DropDownList]: string;

  [ControlType.RadioButtonList]: string;

  [ControlType.CheckBoxList]: Array<string>;
}

/**
 * Control 需要使用的物件定義
 */
export class ControlItem<TControlType extends ControlType> {

  /** Control Key Word */
  id: string;

  /** Control 顯示名稱 */
  name: string;

  /** Control 值 */
  value?: string | boolean;

  /** 是否鎖定控制項 */
  disabled: boolean;

  /** 控制項類型 */
  controlType: ControlType;

  /** 驗證類型與驗證提示訊息 */
  validatorList?: Array<{ message: string, valid: Validators }>;

  constructor(
    id: string,
    name: string,
    disabled: boolean,
    controlType: ControlType,
    value?: string | boolean,
    validatorList?: Array<{ message: string, valid: Validators }>
  ) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.disabled = disabled;
    this.controlType = controlType;
    this.validatorList = validatorList;
  }
}
