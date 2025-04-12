'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should sum numbers with startValue', () => {
    const result = [1, 2, 3, 4].reduce2((acc, val) => acc + val, 0);

    expect(result).toBe(10);
  });

  it('should sum numbers without startValue', () => {
    const result = [1, 2, 3, 4].reduce2((acc, val) => acc + val);

    expect(result).toBe(10);
  });

  it('should multiply all numbers', () => {
    const result = [2, 3, 4].reduce2((acc, val) => acc * val, 1);

    expect(result).toBe(24);
  });

  it('should reduce array of strings to one string', () => {
    const result = ['a', 'b', 'c'].reduce2((acc, val) => acc + val, '');

    expect(result).toBe('abc');
  });

  it('should handle single-element array without startValue', () => {
    const result = [42].reduce2((acc, val) => acc + val);

    expect(result).toBe(42);
  });

  it('should handle empty array with startValue', () => {
    const result = [].reduce2((acc, val) => acc + val, 10);

    expect(result).toBe(10);
  });

  it('should call callback with correct parameters', () => {
    const mockFn = jest.fn((acc, val) => acc + val);

    [1, 2, 3].reduce2(mockFn, 0);
    expect(mockFn).toHaveBeenCalledWith(0, 1, 0, [1, 2, 3]);
    expect(mockFn).toHaveBeenCalledWith(1, 2, 1, [1, 2, 3]);
    expect(mockFn).toHaveBeenCalledWith(3, 3, 2, [1, 2, 3]);
  });

  it('should return undefined for empty array without startValue', () => {
    expect(() => [].reduce2((acc, val) => acc + val)).toThrow();
  });
});
