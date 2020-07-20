/** 目前支援的 FormControl 類型 */
export enum ControlType {
  /** 關鍵字 輸入框 */
  KeywordInput = 'KeywordInput',

  /** 下拉式選單 選擇器 */
  SelectList = 'SelectList',
}

/**
 * Control 需要使用的物件定義
 */
export class ControlItem {

  /** Control Key Word */
  id: string;

  /** Control 顯示名稱 */
  name: string;

  /** Control 類型 */
  controlType: ControlType;

  /** Control 值 */
  value?: string;

  /** 是否隱藏 */
  hidden?: boolean;

  /** 是否鎖定控制項 */
  disabled?: boolean;

  /** Control 初始化資料 [SelectList: array] */
  dataSource?: Array<{ key: string; lable: string }>;

  constructor(
    id: string,
    name: string,
    controlType: ControlType,
    value?: string,
    hidden?: boolean,
    disabled?: boolean,
    dataSource?: Array<{ key: string; lable: string }>,
  ) {
    this.id = id;
    this.name = name;
    this.controlType = controlType;
    this.value = value;
    this.hidden = hidden;
    this.disabled = disabled;
    this.dataSource = dataSource;
  }
}
