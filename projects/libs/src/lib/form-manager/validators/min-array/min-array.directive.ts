import { Directive, forwardRef, Input, Provider } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { minArrayValidatorFn } from './min-array.validator';

const MIN_LENGTH_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinArrayDirective),
  multi: true
};

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[minArray][ngModel],[minArray][formControlName],[minArray][formControl]',
  providers: [MIN_LENGTH_VALIDATOR]
})
export class MinArrayDirective implements Validator {

  @Input() minArray: number;

  validate(c: AbstractControl) {
    return minArrayValidatorFn(this.minArray)(c);
  }
}
