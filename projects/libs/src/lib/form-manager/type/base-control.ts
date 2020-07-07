import { ControlItem } from '../form-manager.model';
import { Input, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, ControlValueAccessor } from '@angular/forms';

export class BaseControl implements ControlValueAccessor, AfterViewInit, OnDestroy {

  // 這裡定義的 Input() 只要繼承此類別的元件，在 Templete 一樣可以接到並使用
  @Input() controlItem: ControlItem;

  control: FormControl = new FormControl();

  protected _onChange: (val: string) => void;
  protected _onTouch: (val: string) => void;

  protected destroy$ = new Subject<any>();

  constructor() { }

  ngAfterViewInit(): void {
    /* 訂閱監聽，就算是繼承但是實際執行過程中，每個元件都是獨立訂閱監聽的*/
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => this.noticeValueChange(val));
  }

  noticeValueChange(val: string) {
    this._onChange(val);
    this._onTouch(val);
  }

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

  /* 釋放資源，就算是繼承此類別的元件，在執行過程中都是獨立運作的*/
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
