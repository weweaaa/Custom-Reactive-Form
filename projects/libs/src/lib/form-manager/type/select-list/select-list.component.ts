import { Component, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '../base-control';

export const SELECT_LIST_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectListComponent),
  multi: true
};

@Component({
  selector: 'lib-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
  providers: [SELECT_LIST_VALUE_ACCESSOR]
})
export class SelectListComponent extends BaseControl {

  constructor() {
    super();
  }
}
