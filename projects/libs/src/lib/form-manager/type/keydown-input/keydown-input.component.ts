import { Component, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { BaseControl } from '../base-control';
import { ControlType } from '../../form-manager.model';

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
  providers: [KEYDOWN_INPUT_VALUE_ACCESSOR]
})
export class KeydownInputComponent extends BaseControl<ControlType.KeywordInput> {

  constructor(injector: Injector) {
    super(injector);
  }

  validString(valid: Validators) {
    switch (valid) {
      case Validators.required:
        return 'required';
      default:
        break;
    }

    return '';
  }
}
