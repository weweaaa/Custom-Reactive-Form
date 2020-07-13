import { Validators } from '@angular/forms';

/** 目前支援的 FormControl 類型 */
export enum ControlType {
  /** 關鍵字 輸入框 */
  KeywordInput = 'KeywordInput',

  /** 下拉式選單 選擇器 */
  DropDownList = 'DropDownList',
}

/**
 * Control 需要使用的物件定義
 */
export class ControlItem {

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
    id: string, name: string,
    disabled: boolean, controlType: ControlType,
    value?: string, validatorList?: Array<{ message: string, valid: Validators }>
  ) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.disabled = disabled;
    this.controlType = controlType;
    this.validatorList = validatorList;
  }
}
