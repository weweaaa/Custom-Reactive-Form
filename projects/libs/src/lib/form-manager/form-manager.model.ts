/** 目前支援的 FormControl 類型 */
export enum ControlType {
  /** 關鍵字 輸入框 */
  KeywordInput = 'KeywordInput',

  /** 下拉式選單 選擇器 */
  SelectList = 'SelectList',

  /** 勾選清單 選擇器 */
  CheckBoxList = 'CheckBoxList',
}


/** 目前支援的 Form Control 的資料型態 */
export interface ControlValueType {
  [ControlType.KeywordInput]: string;

  [ControlType.SelectList]: string;

  [ControlType.CheckBoxList]: string[];
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

  [ControlType.SelectList]: {
    /** 至少選擇一種狀態 */
    required?: BaseValidator;
  };

  [ControlType.CheckBoxList]: {
    /** 勾選指定最少數量 */
    minlength?: MinLengthValidator
    /** 勾選指定最多數量 */
    maxlength?: MaxLengthValidator
  };
}

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

/**
 * Control 需要使用的物件定義
 */
export class ControlItem<TControlType extends ControlType> {

  /** Control Key Word */
  id: string;

  /** Control 顯示名稱 */
  name: string;

  /** Control 類型 */
  controlType: ControlType;

  /** Control 值 */
  value?: string | string[];

  /** 是否隱藏 */
  hidden?: boolean;

  /** 是否鎖定控制項 */
  disabled?: boolean;

  /** Control 初始化資料 [SelectList: array] */
  dataSource?: Array<{ key: string; lable: string }>;

  // 如果 ControlValidator 有沒有定義到 'TControlType' 類型就會出現紅字級以下錯誤訊息
  //      ErrorMsg：類型 'TControlType' 無法用來為類型 'ControlValidator' 編制索引。
  validatorList?: ControlValidator[TControlType];

  constructor(
    id: string,
    name: string,
    controlType: ControlType,
    value?: string | string[],
    hidden?: boolean,
    disabled?: boolean,
    dataSource?: Array<{ key: string; lable: string }>,
    validatorList?: ControlValidator[TControlType],
  ) {
    this.id = id;
    this.name = name;
    this.controlType = controlType;
    this.value = value;
    this.hidden = hidden;
    this.disabled = disabled;
    this.dataSource = dataSource;
    this.validatorList = validatorList;
  }
}
