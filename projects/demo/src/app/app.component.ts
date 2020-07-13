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
    { id: 't1', name: 'test1', value: true, disabled: false, controlType: ControlType.SlideChecked },
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
      value: ['3'],
      disabled: false,
      controlType: ControlType.CheckBoxList,
      dataSource: [
        { key: '1', lable: '1_1' },
        { key: '2', lable: '2_2' },
        { key: '3', lable: '3_3' },
        { key: '4', lable: '4_4' },
      ],
      validatorList: [
        { message: '欄位不可為空白', valid: Validators.required },
      ],
    },
  ];
}
