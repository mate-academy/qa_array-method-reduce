'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should reduce an array to a single value by applying a callback', () => {
    const arr = [1, 2, 3, 4, 5];

    const sum = arr.reduce2((acc, curr) => acc + curr, 0);

    expect(sum).toBe(15); // 1 + 2 + 3 + 4 + 5 = 15
  });

  it('should reduce an array  "[1, 2, 3, 4, 5]"'
   + 'to a single value by applying a callback', () => {
    const arr = [1, 2, 3, 4, 5];
    const product = arr.reduce2((acc, curr) => acc * curr, 1);

    expect(product).toBe(120); // 1 * 2 * 3 * 4 * 5 = 120
  });

  it('should work with an empty array and an initial value', () => {
    const arr = [];

    const result = arr.reduce2((acc, curr) => acc + curr, 10);

    expect(result).toBe(10);
  });

  it('should work with an empty array and an initial value', () => {
    const arr = [];

    const product = arr.reduce2((acc, curr) => acc * curr, 5);

    expect(product).toBe(5);
  });

  it('should handle different data types', () => {
    const arr = ['b', 'i', 'g'];

    const concat = arr.reduce2((acc, curr) => acc + curr, '');

    expect(concat).toBe('big');

    const isTrue = arr.reduce2((acc, curr) => acc && curr, true);

    expect(isTrue).toBeTruthy();
  });
});
