import { Directive, forwardRef, Input, Provider } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { maxArrayValidatorFn } from './max-array.validator';

const MAX_LENGTH_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxArrayDirective),
  multi: true
};

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[maxArray][ngModel],[maxArray][formControlName],[maxArray][formControl]',
  providers: [MAX_LENGTH_VALIDATOR]
})
export class MaxArrayDirective implements Validator {

  @Input() maxArray: number;

  validate(c: AbstractControl) {
    return maxArrayValidatorFn(this.maxArray)(c);
  }
}
