/* eslint-disable max-len */
'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('Should be called', () => {
    expect(reduce).toBeInstanceOf(Function);
  });

  it('Should reduce an array to the sum of its elements', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.reduce2((acc, curr) => acc + curr, 0);

    expect(result).toBe(10);
  });

  it('Should reduce an array without an initial value', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.reduce2((acc, curr) => acc + curr);

    expect(result).toBe(10);
  });

  it('Should handle an array of strings', () => {
    const arr = ['a', 'b', 'c'];
    const result = arr.reduce2((acc, curr) => acc + curr, '');

    expect(result).toBe('abc');
  });

  it('Should reduce an empty array with an initial value', () => {
    const arr = [];
    const result = arr.reduce2((acc, curr) => acc + curr, 5);

    expect(result).toBe(5);
  });

  it('Should provide the correct index in the callback', () => {
    const arr = [10, 20, 30];
    const indices = [];

    arr.reduce2((acc, curr, index) => {
      indices.push(index);

      return acc + curr;
    }, 0);
    expect(indices).toEqual([0, 1, 2]);
  });

  it('Should provide the correct array reference in the callback', () => {
    const arr = [10, 20, 30];

    arr.reduce2((acc, curr, index, array) => {
      expect(array).toBe(arr);

      return acc + curr;
    }, 0);
  });

  it('Should handle complex data structures', () => {
    const arr = [{ value: 1 }, { value: 2 }, { value: 3 }];
    const result = arr.reduce2((acc, curr) => acc + curr.value, 0);

    expect(result).toBe(6);
  });
});
