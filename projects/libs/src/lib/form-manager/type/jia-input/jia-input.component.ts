import { Component, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '../base-control';
import { ControlType } from '../../form-manager.model';

// 這段一定要在繼承的元件當中定義
export const JIA_INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => JiaInputComponent),
  multi: true
};

@Component({
  selector: 'lib-jia-input',
  templateUrl: './jia-input.component.html',
  styleUrls: ['./jia-input.component.scss'],
  providers: [JIA_INPUT_VALUE_ACCESSOR]
})
export class JiaInputComponent extends BaseControl<ControlType.JiaInput> {

  constructor(injector: Injector) {
    super(injector);
  }
}
