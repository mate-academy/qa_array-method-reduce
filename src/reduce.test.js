'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  it('should sum an array of numbers', () => {
    const arr = [1, 2, 3, 4];
    const result = reduce(arr, (acc, curr) => acc + curr, 0);

    expect(result).toBe(10);
  });

  it('should concatenate an array of strings', () => {
    const arr = ['Hello', ' ', 'World', '!'];
    const result = reduce(arr, (acc, curr) => acc + curr, '');

    expect(result).toBe('Hello World!');
  });

  it('should return initial value when array is empty', () => {
    const arr = [];
    const result = reduce(arr, (acc, curr) => acc + curr, 100);

    expect(result).toBe(100);
  });

  it('should use the first element as initial value if not provided', () => {
    const arr = [5, 10, 15];
    const result = reduce(arr, (acc, curr) => acc + curr);

    expect(result).toBe(30);
  });

  it('should throw TypeError if array is null or undefined', () => {
    expect(() => reduce(null, (a, b) => a + b, 0)).toThrow(TypeError);
    expect(() => reduce(undefined, (a, b) => a + b, 0)).toThrow(TypeError);
  });

  it('should throw TypeError if callback is not a function', () => {
    expect(() => reduce([1, 2, 3], null, 0)).toThrow(TypeError);
    expect(() => reduce([1, 2, 3], undefined, 0)).toThrow(TypeError);
    expect(() => reduce([1, 2, 3], 123, 0)).toThrow(TypeError);
  });

  it('should handle array with one element and no initial value', () => {
    const arr = [42];
    const result = reduce(arr, (acc, curr) => acc + curr);

    expect(result).toBe(42);
  });

  it('should handle array with one element and initial value', () => {
    const arr = [42];
    const result = reduce(arr, (acc, curr) => acc + curr, 10);

    expect(result).toBe(52);
  });

  it('should handle array with holes (sparse array)', () => {
    const arr = [1, undefined, 3, undefined, 5];
    const result = reduce(arr, (acc, curr) => acc + (curr || 0), 0);

    expect(result).toBe(9);
  });

  it('should work with objects as accumulator', () => {
    const arr = ['a', 'b', 'c'];
    const result = reduce(
      arr,
      (acc, curr) => {
        acc[curr] = true;

        return acc;
      },
      {}
    );

    expect(result).toEqual({
      a: true,
      b: true,
      c: true,
    });
  });

  it('should work with array of arrays (flatten)', () => {
    const arr = [[1], [2, 3], [4]];
    const result = reduce(arr, (acc, curr) => acc.concat(curr), []);

    expect(result).toEqual([1, 2, 3, 4]);
  });
});
