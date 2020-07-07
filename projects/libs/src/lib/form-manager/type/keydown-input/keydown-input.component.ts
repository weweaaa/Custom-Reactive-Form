import { Component, Input, forwardRef, OnDestroy } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ControlItem } from '../../form-manager.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Angular 在執行元件程式時，會檢查 KeydownInputComponent
// 是否包含 NG_VALUE_ACCESSOR 的設定，若有，則將此 Component 視為一個 表單控制項 FormControl，並可被注入
// KEYDOWN_INPUT_VALUE_ACCESSOR 為我們自定義的名稱
export const KEYDOWN_INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // forwardRef()：將所在的程式快轉到 KeydownInputComponent 產生之後，以避免找不到實體的問題
  useExisting: forwardRef(() => KeydownInputComponent),
  multi: true
};

@Component({
  selector: 'lib-keydown-input',
  templateUrl: './keydown-input.component.html',
  styleUrls: ['./keydown-input.component.scss'],

  // 這段如果忘記加，可能會遇到類似此段的錯誤訊息：ERROR Error: No value accessor for form control with name: 'xxxxxx'
  // xxxxxx 是你傳入的 formControlName
  providers: [KEYDOWN_INPUT_VALUE_ACCESSOR]   // 將剛剛定義可被注入的 token 注入到此 Component
})
export class KeydownInputComponent implements OnDestroy, ControlValueAccessor {

  /** 用來設定此元件需要的參數物件 */
  @Input() controlItem: ControlItem;

  control: FormControl;

  // 用來接收 registerOnChange 和 registerOnTouched 傳入的方法
  private _onChange: (val: string) => void;
  private _onTouch: (val: string) => void;

  /** 釋放 subscribe 用的物件 */
  private destroy$ = new Subject<any>();

  constructor() { }

  /** 內部實作資料改變事件 */
  noticeValueChange(val: string) {
    this._onChange(val);
    this._onTouch(val);
  }

  /** 因為有實作 subscribe，所以要記得自己實作 destroy，否則 subscribe 會一直存在，並且重複持續增長 */
  ngOnDestroy() {
    this.destroy$.next(); // 實作 Subject 接收到新值時，next 被調用
    this.destroy$.complete(); // 實作 Subject 訂閱的 Observable 結束後，complete 被調用
  }


  // [以下是 ControlValueAccessor 介面需要實作的方法]
  // ---------------------------------------------------------------
  /** 只要 外部 傳入值發生了變化就會觸發 writeValue */
  writeValue(obj: any): void {

    // 判斷 control 是否為 undefined，
    // 如果是則 new FormControl 物件出來，並訂閱 判斷值是否改變的事件
    if (!this.control) {
      this.control = new FormControl(obj);

      // 當外部傳入值 obj 引發 control.valueChanges 時，內部同步引發 noticeValueChange()
      // takeUntil(this.destroy$) 就是為了在 valueChanges 前送出一個訊息到 Subject，以便 Complete Observable
      this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => this.noticeValueChange(val));
    } else {
      // 如果不是 undefined 則僅需要設定新的值即可
      this.control.setValue(obj);
    }
  }

  /** 登記註冊 OnChange */
  registerOnChange(fn: any): void {
    /** 內部自訂實作 OnChange */
    this._onChange = fn;
  }

  /** 登記註冊 OnTouched */
  registerOnTouched(fn: any): void {
    /** 內部自訂實作 onTouch */
    this._onTouch = fn;
  }

  /** 外部觸發 Disable/Enable 事件 */
  setDisabledState?(isDisabled: boolean): void {
    // 內部依據外部傳入設定實作
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
