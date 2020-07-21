import { Component } from '@angular/core';
import { ControlItem, ControlType } from 'projects/libs/src/lib/form-manager/form-manager.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // 測試資料
  controlData: ControlItem<ControlType>[] = [
    {
      id: 't1',
      name: 'test1',
      controlType: ControlType.KeywordInput,
      value: '123',
      disabled: true
    },
    {
      id: 't2',
      name: 'test2',
      controlType: ControlType.KeywordInput,
      value: '',
      disabled: false,
      validatorList: {
        required: { message: '該欄位不可為空值！' },
        maxlength: { message: '最多只能輸入兩個字元！', value: 2 }
      }
    },
    {
      id: 't3',
      name: 'test3',
      controlType: ControlType.CheckBoxList,
      value: ['2'],
      disabled: false,
      dataSource: [
        { key: '1', lable: 'a' },
        { key: '2', lable: 'b' },
        { key: '3', lable: 'c' },
      ],
      validatorList: {
        maxArray: { message: '最多只能勾選兩個選項！', value: 2 }
      }
    } as ControlItem<ControlType.CheckBoxList>,
  ];
}
