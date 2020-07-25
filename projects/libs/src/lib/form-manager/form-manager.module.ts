import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormManagerComponent } from './form-manager.component';
import { JiaInputComponent } from './type/jia-input/jia-input.component';
import { SelectListComponent } from './type/select-list/select-list.component';
import { CheckBoxListComponent } from './type/check-box-list/check-box-list.component';

@NgModule({
  declarations: [FormManagerComponent, JiaInputComponent, SelectListComponent, CheckBoxListComponent],
  exports: [FormManagerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FormManagerModule { }
