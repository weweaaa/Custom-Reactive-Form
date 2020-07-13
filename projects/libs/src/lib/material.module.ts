import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatFormFieldModule
  ],
  exports: [
    MatInputModule,
    MatSlideToggleModule,   // <--- 因為是當作 Material 統一匯入的 Module，所以新增的時候記得要 export 出來才能使用
    MatFormFieldModule
  ]
})
export class MaterialModule { }
