import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatFormFieldModule
  ],
  exports: [
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }
