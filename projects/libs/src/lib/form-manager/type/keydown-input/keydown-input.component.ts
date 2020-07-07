import { Component, Input, forwardRef, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ControlItem } from '../../form-manager.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const KEYDOWN_INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => KeydownInputComponent),
  multi: true
};

@Component({
  selector: 'lib-keydown-input',
  templateUrl: './keydown-input.component.html',
  styleUrls: ['./keydown-input.component.scss'],
  providers: [KEYDOWN_INPUT_VALUE_ACCESSOR]
})
export class KeydownInputComponent implements OnDestroy, AfterViewInit, ControlValueAccessor {

  @Input() controlItem: ControlItem;

  // [!!!很重要!!!] 這裡預先就先給予初始化 FormControl 物件的動作
  control: FormControl = new FormControl();

  private _onChange: (val: string) => void;
  private _onTouch: (val: string) => void;

  private destroy$ = new Subject<any>();

  constructor() { }

  /* 將 訂閱 的動作改為在 畫面生成確定完成後，再來訂閱需要監聽的值改變事件 */
  ngAfterViewInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => this.noticeValueChange(val));
  }

  noticeValueChange(val: string) {
    this._onChange(val);
    this._onTouch(val);
  }

  /** 調整 writeValue 裡面的流程 */
  writeValue(obj: any): void {
    this.control.setValue(obj);
  }

  registerOnChange(fn: any): void {

    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {

    this._onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.control?.disable() : this.control?.enable();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
