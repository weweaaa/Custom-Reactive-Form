import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { BaseControl } from '../base-control';

// 這段一定要在繼承的元件當中定義
export const KEYDOWN_INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => KeydownInputComponent),
  multi: true
};

@Component({
  selector: 'lib-keydown-input',
  templateUrl: './keydown-input.component.html',
  styleUrls: ['./keydown-input.component.scss'],

  // 記得 providers 注入，否則可能出現的錯誤訊息示意如下
  /*
      ERROR Error: No value accessor for form control with name: 'xxxxx 此為你設定的 input id'
          at _throwError (forms.js:3479)
          at setUpControl (forms.js:3305)
          at FormGroupDirective.addControl (forms.js:7551)
          at FormControlName._setUpControl (forms.js:8367)
          at FormControlName.ngOnChanges (forms.js:8288)
          at FormControlName.wrapOnChangesHook_inPreviousChangesStorage (core.js:26848)
          at callHook (core.js:3941)
          at callHooks (core.js:3901)
          at executeInitAndCheckHooks (core.js:3842)
          at refreshView (core.js:11795)
  */
  providers: [KEYDOWN_INPUT_VALUE_ACCESSOR]
})
export class KeydownInputComponent extends BaseControl {

  constructor() {
    super();
  }
}
