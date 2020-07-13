import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { isPresent } from '../util';

/**
 * 最小勾選數量限制
 */
export const minArray = (length: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors => {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    if (!minArrayValidatorFn(length)(control)) {
      return null;
    }

    return {
      minArray: true
    };
  };
};


export function minArrayValidatorFn(length: number) {
  return (c: AbstractControl): ValidationErrors => {

    if (Array.isArray(c.value) && c.value.length >= length) {
      return null;
    }

    return {
      minArray: true
    };
  };
}
