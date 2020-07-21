import { FormControl } from '@angular/forms';
import { minArray } from './min-array.validator';

describe('MinArray Validator', () => {

  it('["A", "B", "C"] Array should be 3 MinArray', () => {
    const control = new FormControl(['A', 'B', 'C']);
    expect(minArray(3)(control)).toBeNull();
  });

  it('["A"] Array should not be 2 MinArray', () => {
    const control = new FormControl('["A"]');
    expect(minArray(3)(control)).toEqual({ minArray: true });
  });
});
