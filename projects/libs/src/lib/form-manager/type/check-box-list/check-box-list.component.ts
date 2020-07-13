import { Component, OnInit, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '../base-control';
import { ControlType } from '../../form-manager.model';

export const CHECK_BOX_LIST_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckBoxListComponent),
  multi: true
};

@Component({
  selector: 'lib-check-box-list',
  templateUrl: './check-box-list.component.html',
  styleUrls: ['./check-box-list.component.scss'],
  providers: [CHECK_BOX_LIST_VALUE_ACCESSOR]
})
export class CheckBoxListComponent extends BaseControl<ControlType.CheckBoxList>  {
  constructor(injector: Injector) {
    super(injector);
  }

}
