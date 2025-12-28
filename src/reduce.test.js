'use strict';
/* eslint-disable max-len */

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should not mutate the original array', () => {
    const array = [1, 2, 3, 4, 5];
    const copy = [...array];

    array.reduce2((prev, curr) => prev + curr, 0);

    expect(array).toEqual(copy);
  });

  it('should return a value', () => {
    const arr = [1, 2, 3];

    const result = arr.reduce2((acc, x) => acc + x, 0);

    expect(result).toBeDefined();
  });

  it('should reduce array without initial value', () => {
    const arr = [1, 2, 3];
    const result = arr.reduce2((acc, curr) => acc + curr);

    expect(result).toBe(6);
  });

  it('should return the same type as initial value', () => {
    const arr = [1, 2, 3];

    const result = arr.reduce2((acc, x) => {
      acc.push(x);

      return acc;
    }, []);

    expect(Array.isArray(result)).toBe(true);
  });

  it.skip('should throw TypeError when reducing empty array without initial value', () => {
    const arr = [];

    expect(() => arr.reduce2((acc, curr) => acc + curr)).toThrow(TypeError);
  });

  it('should work with the single element array correctly', () => {
    const arr = [42];
    const result1 = arr.reduce2((acc, curr) => acc + curr);
    const result2 = arr.reduce2((acc, curr) => acc + curr, -42);

    expect(result1).toBe(42);
    expect(result2).toBe(0);
  });

  it('should call callback once per element', () => {
    const arr = [1, 2, 3];
    const cb = jest.fn((acc, x) => acc + x);

    arr.reduce2(cb, 0);

    expect(cb).toHaveBeenCalledTimes(arr.length);
  });

  it('should pass accumulator, current value, index and array', () => {
    const arr = [10, 20];
    const cb = jest.fn((acc, x) => acc + x);

    arr.reduce2(cb, 0);

    expect(cb).toHaveBeenNthCalledWith(
      1,
      0,
      10,
      0,
      arr
    );
  });

  it('should not call callback for empty array', () => {
    const cb = jest.fn();

    const result = [].reduce2(cb, 100);

    expect(cb).not.toHaveBeenCalled();
    expect(result).toBe(100);
  });
});
