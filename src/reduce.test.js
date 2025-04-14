'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should sum all elements in the array', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.reduce2((acc, curr) => acc + curr, 0);

    expect(result).toBe(10);
  });

  it('should multiply all elements in the array', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.reduce2((acc, curr) => acc * curr, 1);

    expect(result).toBe(24);
  });

  it('should concatenate all elements in the array', () => {
    const arr = ['a', 'b', 'c'];
    const result = arr.reduce2((acc, curr) => acc + curr, '');

    expect(result).toBe('abc');
  });

  it('should handle no initial value', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.reduce2((acc, curr) => acc + curr);

    expect(result).toBe(10);
  });

  it('should handle an empty array with initial value', () => {
    const arr = [];
    const result = arr.reduce2((acc, curr) => acc + curr, 0);

    expect(result).toBe(0);
  });

  it('should find the maximum value in the array', () => {
    const arr = [1, 3, 2, 5, 4];
    const result = arr.reduce2((max, curr) =>
      (curr > max ? curr : max), -Infinity);

    expect(result).toBe(5);
  });

  it('should find the minimum value in the array', () => {
    const arr = [1, 3, 2, 5, 4];
    const result = arr.reduce2((min, curr) =>
      (curr < min ? curr : min), Infinity);

    expect(result).toBe(1);
  });

  it('should count the occurences of each element in the array', () => {
    const arr = ['a', 'b', 'a', 'c', 'b', 'a'];
    const result = arr.reduce2((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;

      return acc;
    }, {});

    expect(result).toEqual({
      a: 3, b: 2, c: 1,
    });
  });

  it('should flatten a nested array', () => {
    const arr = [[1, 2], [3, 4], [5]];
    const result = arr.reduce2((acc, curr) => acc.concat(curr), []);

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle an array of objects and sum a specific property', () => {
    const arr = [{ x: 1 }, { x: 2 }, { x: 3 }];
    const result = arr.reduce2((acc, curr) => acc + curr.x, 0);

    expect(result).toBe(6);
  });

  it('should handle an array with mixed data types', () => {
    const arr = [1, '2', 3, '4'];
    const result = arr.reduce2((acc, curr) => acc + Number(curr), 0);

    expect(result).toBe(10);
  });
});
