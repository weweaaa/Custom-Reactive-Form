import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatFormFieldModule
  ],
  exports: [
    MatInputModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatListModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }
