import { Validators } from '@angular/forms';

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

  /** 驗證類型與驗證提示訊息 */
  validatorList?: Array<{ message: string, valid: Validators }>;

  constructor(id: string, name: string, disabled: boolean, value?: string, validatorList?: Array<{ message: string, valid: Validators }>) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.disabled = disabled;
    this.validatorList = validatorList;
  }
}
