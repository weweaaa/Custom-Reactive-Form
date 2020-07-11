import { ControlItem } from '../form-manager.model';
import { Input, AfterViewInit, OnDestroy, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, ControlValueAccessor, AbstractControl, ControlContainer } from '@angular/forms';

export class BaseControl implements ControlValueAccessor, AfterViewInit, OnDestroy {

  @Input() controlItem: ControlItem;
  @Input()
  set formControlName(name: string) {
    this._formControlName = name;
    this.outsideContorl = this.injector.get(ControlContainer)?.control?.get(name) as FormControl;
  }
  get formControlName() { return this._formControlName; }
  private _formControlName;

  control: FormControl = new FormControl();
  outsideContorl: AbstractControl;

  protected _onChange: (val: string) => void;
  protected _onTouch: (val: string) => void;

  protected destroy$ = new Subject<any>();

  constructor(private injector: Injector) { }

  ngAfterViewInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => this.noticeValueChange(val));
  }

  noticeValueChange(val: string) {
    if (this._onChange) {
      this._onChange(val);
    }
    if (this._onTouch) {
      this._onTouch(val);
    }
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
