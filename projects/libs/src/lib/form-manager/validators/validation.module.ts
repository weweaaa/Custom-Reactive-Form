import { NgModule } from '@angular/core';
import { maxArray, MaxArrayDirective } from './max-array';
import { minArray, MinArrayDirective } from './min-array';

export const CustomValidators = {
  maxArray,
  minArray,
};

const DIRECTIVES = [
  MaxArrayDirective,
  MinArrayDirective,
];

@NgModule({
  declarations: [DIRECTIVES],
  exports: [DIRECTIVES]
})
export class CustomValidationModule { }
