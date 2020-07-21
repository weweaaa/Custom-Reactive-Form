import { ControlItem, ControlValueType, ControlType } from '../form-manager.model';
import { Input, AfterViewInit, OnDestroy, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, ControlValueAccessor, AbstractControl, ControlContainer } from '@angular/forms';

export class BaseControl<TControlType extends ControlType> implements ControlValueAccessor, AfterViewInit, OnDestroy {

  // 這裡定義的 Input() 只要繼承此類別的元件，在 Templete 一樣可以接到並使用
  @Input() controlItem: ControlItem<ControlType>;
  @Input() set formControlName(name: string) {
    this._formControlName = name;
    this.outsideContorl = this.injector.get(ControlContainer)?.control?.get(name) as FormControl;
  } get formControlName() { return this._formControlName; }
  private _formControlName;

  control: AbstractControl = new FormControl();
  outsideContorl: AbstractControl;

  protected _onChange: (val: ControlValueType[TControlType]) => void;
  protected _onTouch: (val: ControlValueType[TControlType]) => void;

  protected destroy$ = new Subject<any>();

  constructor(private injector: Injector) { }

  ngAfterViewInit(): void {
    /* 訂閱監聽，就算是繼承但是實際執行過程中，每個元件都是獨立訂閱監聽的*/
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => this.noticeValueChange(val));
  }

  noticeValueChange(val: ControlValueType[TControlType]) {
    this._onChange(val);
    this._onTouch(val);
  }

  writeValue(obj: ControlValueType[TControlType]): void {
    this.control.setValue(obj);
  }

  registerOnChange(fn: (val: ControlValueType[TControlType]) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: (val: ControlValueType[TControlType]) => void): void {
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
