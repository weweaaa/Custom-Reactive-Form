import { Component } from '@angular/core';
import { ControlItem, ControlType } from 'projects/libs/src/lib/form-manager/form-manager.model';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // 測試資料
  controlData: ControlItem<ControlType>[] = [
    { id: 't1', name: 'test1', value: '', disabled: true, controlType: ControlType.KeywordInput },
    {
      id: 't2',
      name: 'test2',
      value: '',
      disabled: false,
      controlType: ControlType.KeywordInput,
      validatorList: [
        { message: '欄位不可為空白', valid: Validators.required }
      ]
    },
    {
      id: 't3',
      name: 'test3',
      value: '',
      disabled: false,
      controlType: ControlType.KeywordInput,
      validatorList: [
        { message: '欄位不可為空白', valid: Validators.required },
      ]
    },
  ];
}
