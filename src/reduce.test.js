'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it(`should return the initial value
    when array is empty and initial value is provided`, () => {
    const result = [].reduce2((acc, curr) => acc + curr, 5);

    expect(result).toBe(5);
  });

  it('should accumulate values correctly in an array of numbers', () => {
    const result = [1, 2, 3, 4].reduce2((acc, curr) => acc + curr);

    expect(result).toBe(10);
  });

  it(`should use the first element as the initial value
    when no initial value is provided`, () => {
    const result = [1, 2, 3, 4].reduce2((acc, curr) => acc + curr);

    expect(result).toBe(10);
  });

  it('should handle an array with one element', () => {
    const result = [5].reduce2((acc, curr) => acc + curr);

    expect(result).toBe(5);
  });

  it('should handle an array with one element without initial value', () => {
    const result = [5].reduce2((acc, curr) => acc + curr);

    expect(result).toBe(5);
  });

  it(`should return undefined
    when the array is empty and no initial value is proided`, () => {
    const result = [].reduce2((acc, curr) => acc + curr);

    expect(result).toBe(undefined);
  });

  it(`should correctly handle an array of objects
    and apply the callback function`, () => {
    const arr = [{ value: 1 }, { value: 2 }, { value: 3 }];
    const result = arr.reduce2((acc, curr) => acc + curr.value, 0);

    expect(result).toBe(6);
  });

  it('should correctly handle non-numeric arrays', () => {
    const result = ['a', 'b', 'c'].reduce2((acc, curr) => acc + curr, '');

    expect(result).toBe('abc');
  });
});
