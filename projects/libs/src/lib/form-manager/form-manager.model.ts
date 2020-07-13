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

/** 目前支援的 Form Control 的驗證物件模型 */
export interface ControlValidator {

  [ControlType.KeywordInput]: {
    /** 不可為空值 */
    required?: BaseValidator;
    /** 限制 最小長度 */
    minlength?: MinLengthValidator;
    /** 限制 最大長度 */
    maxlength?: MaxLengthValidator;
    /** 限制 信箱 格式 */
    email?: BaseValidator;
  };

  [ControlType.CheckBox]: {
    /** 至少選擇一種狀態 */
    required?: BaseValidator;
  };

  [ControlType.SlideChecked]: {
    /** 至少選擇一種狀態 */
    required?: BaseValidator;
  };

  [ControlType.DatePicker]: {
    /** 依據條件參數進行 日期範圍 判斷 */
    dateRange?: DateRangeValidator;
  };

  [ControlType.DropDownList]: {
    /** 至少選擇一種 */
    required?: BaseValidator
  };

  [ControlType.RadioButtonList]: {
    /** 至少選擇一種 */
    required?: BaseValidator
  };

  [ControlType.CheckBoxList]: {
    /** 勾選指定最少數量 */
    minlength?: MinLengthValidator
    /** 勾選指定最多數量 */
    maxlength?: MaxLengthValidator
  };
}



// [驗證類型 定義]
// -----------------------------------------------------------------------------

/** 所有驗證類型的 根物件 */
interface BaseValidator { message?: string; }

/** 最小長度驗證 */
interface MinLengthValidator extends BaseValidator {
  value: number;
}

/** 最大長度驗證 */
interface MaxLengthValidator extends BaseValidator {
  value: number;
}

/** 日期範圍驗證 */
interface DateRangeValidator extends BaseValidator {

  /** 判斷 起始日期 必須大於... */
  start?: number;
  /** 判斷 結束日期 必須小於... */
  end?: number;
}

/** 時間範圍驗證 */
interface TimeRangeValidator extends BaseValidator {

  /** 判斷 起始時間 必須大於... */
  start?: number | Date;
  /** 判斷 結束時間 必須小於... */
  end?: number | Date;
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
  value?: string | boolean | string[];

  /** 是否鎖定控制項 */
  disabled: boolean;

  /** 控制項類型 */
  controlType: TControlType;

  /** 驗證類型與驗證提示訊息 */
  validatorList?: ControlValidator[TControlType];

  dataSource?: Array<{ key: string; lable: string }>;

  constructor(
    id: string,
    name: string,
    disabled: boolean,
    controlType: TControlType,
    value?: string | boolean | string[],
    dataSource?: Array<{ key: string; lable: string }>,
    validatorList?: ControlValidator[TControlType],
  ) {
    this.id = id;
    this.name = name;
    this.disabled = disabled;
    this.controlType = controlType;
    this.value = value;
    this.dataSource = dataSource;
    this.validatorList = validatorList;
  }
}
