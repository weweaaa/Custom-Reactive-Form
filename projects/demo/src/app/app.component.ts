import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // 測試資料
  userInfo = {
    name: 'test',
    age: 888
  };

  log(event) {
    console.log(event);
  }
}
