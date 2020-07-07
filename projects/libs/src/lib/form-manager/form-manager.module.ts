import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormManagerComponent } from './form-manager.component';

@NgModule({
  declarations: [FormManagerComponent],
  exports: [FormManagerComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FormManagerModule { }
