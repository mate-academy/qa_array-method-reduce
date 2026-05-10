'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should sum all numbers with startValue', () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = numbers.reduce2((acc, curr) => acc + curr, 0);

    expect(result).toBe(15);
  });

  it('should sum all numbers without startValue', () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = numbers.reduce2((acc, curr) => acc + curr);

    expect(result).toBe(15);
  });

  it('should flatten a nested array', () => {
    const nested = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const result = nested.reduce2((acc, curr) => acc.concat(curr), []);

    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should work with strings', () => {
    const words = ['Hello', ' ', 'World', '!'];
    const result = words.reduce2((acc, curr) => acc + curr, '');

    expect(result).toBe('Hello World!');
  });

  it('should work with single element array without startValue', () => {
    const single = [42];
    const result = single.reduce2((acc) => acc);

    expect(result).toBe(42);
  });

  it('should work with single element array with startValue', () => {
    const single = [42];
    const result = single.reduce2((acc, curr) => acc + curr, 10);

    expect(result).toBe(52);
  });

  it('should return startValue for empty array', () => {
    const empty = [];
    const result = empty.reduce2((acc, curr) => acc + curr, 100);

    expect(result).toBe(100);
  });

  it('should throw TypeError for empty array without startValue', () => {
    const empty = [];

    expect(() => {
      empty.reduce2((acc, curr) => acc + curr);
    }).toThrow(TypeError);
  });

  it('should pass correct index to callback', () => {
    const numbers = [1, 2, 3];
    const indices = [];

    numbers.reduce2((acc, curr, index) => {
      indices.push(index);

      return acc + curr;
    }, 0);

    expect(indices).toEqual([0, 1, 2]);
  });

  it('should pass correct index when startValue is provided', () => {
    const numbers = [1, 2, 3];
    const indices = [];

    numbers.reduce2((acc, curr, index) => {
      indices.push(index);

      return acc + curr;
    }, 0);

    expect(indices).toEqual([0, 1, 2]);
  });

  it('should pass correct index when startValue is not provided', () => {
    const numbers = [1, 2, 3];
    const indices = [];

    numbers.reduce2((acc, curr, index) => {
      indices.push(index);

      return acc + curr;
    });

    expect(indices).toEqual([1, 2]);
  });

  it('should pass the original array to callback', () => {
    const arr = [1, 2, 3];
    let receivedArray;

    arr.reduce2((acc, curr, index, array) => {
      receivedArray = array;

      return acc + curr;
    }, 0);

    expect(receivedArray).toBe(arr);
  });

  it('should work with negative numbers', () => {
    const numbers = [-1, -2, -3, -4];
    const result = numbers.reduce2((acc, curr) => acc + curr, 0);

    expect(result).toBe(-10);
  });

  it('should work with mixed positive and negative numbers', () => {
    const numbers = [10, -5, 3, -8, 2];
    const result = numbers.reduce2((acc, curr) => acc + curr, 0);

    expect(result).toBe(2);
  });
});
