import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormManagerComponent } from './form-manager.component';
import { KeydownInputComponent } from './type/keydown-input/keydown-input.component';
import { SlideCheckedComponent } from './type/slide-checked/slide-checked.component';
import { CheckBoxListComponent } from './type/check-box-list/check-box-list.component';

@NgModule({
  declarations: [FormManagerComponent, KeydownInputComponent, SlideCheckedComponent, CheckBoxListComponent],
  exports: [FormManagerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FormManagerModule { }
