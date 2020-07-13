import { Component, Injector, forwardRef } from '@angular/core';
import { ControlType } from '../../form-manager.model';
import { BaseControl } from '../base-control';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const SLIDE_CHECKED_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SlideCheckedComponent),
  multi: true
};

@Component({
  selector: 'lib-slide-checked',
  templateUrl: './slide-checked.component.html',
  styleUrls: ['./slide-checked.component.scss'],
  providers: [SLIDE_CHECKED_VALUE_ACCESSOR]    // <----- 別忘記加了~~!!!!
})
export class SlideCheckedComponent extends BaseControl<ControlType.SlideChecked> {

  constructor(injector: Injector) {
    super(injector);
  }
}
