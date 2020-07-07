import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const MY_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormManagerComponent),
  multi: true
};

@Component({
  selector: 'lib-form-manager',
  templateUrl: './form-manager.component.html',
  styleUrls: ['./form-manager.component.scss'],
  providers: [MY_CONTROL_VALUE_ACCESSOR]
})
export class FormManagerComponent implements ControlValueAccessor {

  info: { name: string, age: number } = { name: '', age: 0 };

  // 用來接收 setDisabledState 的狀態
  disabled = false;

  // 用來接收 registerOnChange 和 registerOnTouched 傳入的方法
  onChange: (value) => {};
  onTouched: () => {};

  constructor() { }

  writeValue(obj: any): void {
    this.info = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // 元件內必須找一個時機觸發 onChange 方法，我們將此方法綁定在 input 上
  userInfoChange() {
    this.onChange(this.info);
  }
}
