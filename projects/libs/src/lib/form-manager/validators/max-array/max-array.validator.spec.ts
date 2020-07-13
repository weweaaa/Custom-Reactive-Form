import { FormControl } from '@angular/forms';
import { maxArray } from './max-array.validator';

describe('MaxArray Validator', () => {

  it('["A", "B", "C"] Array should be 3 MaxArray', () => {
    const control = new FormControl(['A', 'B', 'C']);
    expect(maxArray(3)(control)).toBeNull();
  });

  it('["A"] Array should not be 3 MaxArray', () => {
    const control = new FormControl(['A']);
    expect(maxArray(3)(control)).toEqual({ maxArray: true });
  });
});
