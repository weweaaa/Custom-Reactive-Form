import { Component } from '@angular/core';
import { ControlItem, ControlType } from 'projects/libs/src/lib/form-manager/form-manager.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // 測試資料
  controlData: ControlItem[] = [
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
    },
    {
      id: 't3',
      name: 'test3',
      controlType: ControlType.SelectList,
      value: '2',
      disabled: false,
      dataSource: [
        { key: '1', lable: 'a' },
        { key: '2', lable: 'b' },
        { key: '3', lable: 'c' },
      ]
    },
  ];
}
