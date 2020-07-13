import { ControlItem, ControlType, ControlValueType } from '../form-manager.model';
import { Input, AfterViewInit, OnDestroy, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, ControlValueAccessor, AbstractControl, ControlContainer } from '@angular/forms';

export class BaseControl<TControlType extends ControlType> implements ControlValueAccessor, AfterViewInit, OnDestroy {

  @Input() controlItem: ControlItem<TControlType>;
  @Input()
  set formControlName(name: string) {
    this._formControlName = name;
    this.outsideContorl = this.injector.get(ControlContainer)?.control?.get(name) as FormControl;
  }
  get formControlName() { return this._formControlName; }
  private _formControlName;

  control: FormControl = new FormControl();
  outsideContorl: AbstractControl;

  protected _onChange: (val: ControlValueType[TControlType]) => void;
  protected _onTouch: (val: ControlValueType[TControlType]) => void;

  protected destroy$ = new Subject<any>();

  constructor(private injector: Injector) { }

  ngAfterViewInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => this.noticeValueChange(val));
  }

  noticeValueChange(val: ControlValueType[TControlType]) {
    if (this._onChange) {
      this._onChange(val);
    }
    if (this._onTouch) {
      this._onTouch(val);
    }
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
