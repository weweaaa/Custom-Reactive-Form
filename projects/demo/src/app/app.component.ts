import { Component } from '@angular/core';
import { ControlItem } from 'projects/libs/src/lib/form-manager/form-manager.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // 測試資料
  controlData: ControlItem[] = [
    { id: 't1', name: 'test1', value: '123', disabled: true },
    {
      id: 't2',
      name: 'test2',
      value: '',
      disabled: false,
    },
    {
      id: 't3',
      name: 'test3',
      value: '',
      disabled: false
    },
  ];
}
