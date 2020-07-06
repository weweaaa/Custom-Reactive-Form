import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormManagerComponent } from './form-manager.component';

@NgModule({
  declarations: [FormManagerComponent],
  exports: [FormManagerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FormManagerModule { }
