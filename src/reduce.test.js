'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should sum all numbers in array with initial value', () => {
    const result = [1, 2, 3, 4].reduce2((acc, curr) => acc + curr, 0);

    expect(result).toBe(10);
  });

  it('should sum all numbers in array without initial value', () => {
    const result = [1, 2, 3, 4].reduce2((acc, curr) => acc + curr);

    expect(result).toBe(10);
  });

  it('should handle reducing to a single string', () => {
    const result = ['a', 'b', 'c'].reduce2((acc, curr) => acc + curr, '');

    expect(result).toBe('abc');
  });

  it('should handle reducing an array of objects', () => {
    const arr = [{ value: 1 }, { value: 2 }, { value: 3 }];
    const result = arr.reduce2((acc, curr) => acc + curr.value, 0);

    expect(result).toBe(6);
  });

  it('should return the first element if no initial value',
    () => {
      const result = [42].reduce2((acc, curr) => acc + curr);

      expect(result).toBe(42);
    });

  it('should return undefined if array is empty and no value is provided',
    () => {
      const result = [].reduce2((acc, curr) => acc + curr);

      expect(result).toBe(undefined);
    });

  it('should pass index and array to callback', () => {
    const mockFn = jest.fn((acc, curr, index, arr) => acc + curr);

    [1, 2, 3].reduce2(mockFn, 0);

    expect(mockFn).toHaveBeenCalledWith(0, 1, 0, [1, 2, 3]);
    expect(mockFn).toHaveBeenCalledWith(1, 2, 1, [1, 2, 3]);
    expect(mockFn).toHaveBeenCalledWith(3, 3, 2, [1, 2, 3]);
  });

  it('should work correctly with holes in the array', () => {
    const arr = [1, 3];
    const result = arr.reduce2((acc, curr) => acc + (curr || 0), 0);

    expect(result).toBe(4);
  });

  it('should allow reducing with boolean values', () => {
    const result = [true, false, true].reduce2(
      (acc, curr) => acc && curr, true);

    expect(result).toBe(false);
  });
});
