'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should ', () => {

  });

  it('should reduce array of numbers with a start value', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.reduce2((acc, curr) => acc + curr, 0);

    expect(result).toBe(10);
  });

  it('should reduce array of numbers without a start value', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.reduce2((acc, curr) => acc + curr);

    expect(result).toBe(10);
  });

  it('should reduce array to a product of elements', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.reduce2((acc, curr) => acc * curr, 1);

    expect(result).toBe(24);
  });

  it('should work with array of strings', () => {
    const arr = ['a', 'b', 'c'];
    const result = arr.reduce2((acc, curr) => acc + curr, '');

    expect(result).toBe('abc');
  });

  it('should use first element as initial value when start value not provided',
    () => {
      const arr = [10, 20, 30];
      const mockFn = jest.fn((acc, curr) => acc + curr);
      const result = arr.reduce2(mockFn);

      expect(result).toBe(60);
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenNthCalledWith(1, 10, 20, 1, arr);
      expect(mockFn).toHaveBeenNthCalledWith(2, 30, 30, 2, arr);
    });

  it('should return undefined if array is empty and no start value is provided',
    () => {
      const arr = [];
      const result = arr.reduce2((a, b) => a + b);

      expect(result).toBeUndefined();
    });

  it('should return start value if array is empty and start value is provided',
    () => {
      const arr = [];
      const result = arr.reduce2((acc, curr) => acc + curr, 100);

      expect(result).toBe(100);
    });
});
