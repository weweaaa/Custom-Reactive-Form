import { Component, Input, forwardRef, OnDestroy } from '@angular/core';
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
export class KeydownInputComponent implements OnDestroy, ControlValueAccessor {

  @Input() controlItem: ControlItem;

  control: FormControl;

  private _onChange: (val: string) => void;
  private _onTouch: (val: string) => void;

  private destroy$ = new Subject<any>();

  constructor() { }

  noticeValueChange(val: string) {
    this._onChange(val);
    this._onTouch(val);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(obj: any): void {

    if (!this.control) {
      this.control = new FormControl(obj);

      this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => this.noticeValueChange(val));
    } else {

      this.control.setValue(obj);
    }
  }

  registerOnChange(fn: any): void {

    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {

    this._onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {

    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
