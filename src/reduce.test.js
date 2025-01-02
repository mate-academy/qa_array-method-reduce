'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should correctly reduce an array of numbers with addition', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.reduce2((acc, curr) => acc + curr, 0);

    expect(result).toBe(10);
  });

  it('should correctly reduce an array of numbers with multiplication', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.reduce2((acc, curr) => acc * curr, 1);

    expect(result).toBe(24);
  });

  it('should use the first element = startval if no init value is pass', () => {
    const arr = [5, 10, 15];
    const result = arr.reduce2((acc, curr) => acc + curr);

    expect(result).toBe(30);
  });

  it('should correctly reduce an array with no initial value', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.reduce2((acc, curr) => acc + curr);

    expect(result).toBe(10);
  });

  it('should correctly handle an empty array', () => {
    const arr = [];
    const result = arr.reduce2((acc, curr) => acc + curr, 0);

    expect(result).toBe(0);
  });

  it('should correctly reduce an array with string concatenation', () => {
    const arr = ['a', 'b', 'c'];
    const result = arr.reduce2((acc, curr) => acc + curr, '');

    expect(result).toBe('abc');
  });

  it('should handle an array with mixed types', () => {
    const arr = [1, '2', 3];
    const result = arr.reduce2((acc, curr) => acc + curr, '');

    expect(result).toBe('123');
  });

  it('should corr reduce with ind, array as third and fourth arguments', () => {
    const arr = [1, 2, 3];
    const result = arr.reduce2((acc, curr, index, array) => {
      return acc + curr + index + array.length;
    }, 0);

    expect(result).toBe(18);
  });

  it('should handle non-numeric operations', () => {
    const arr = [2, 3, 5];
    const result = arr.reduce2((acc, curr) => acc + (curr > 2 ? 1 : 0), 0);

    expect(result).toBe(2);
  });
});
