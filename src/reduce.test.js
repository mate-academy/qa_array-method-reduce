'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should work with start value', () => {
    const arr = [1, 2, 3];
    const result = arr.reduce2((acc, val) => acc + val, 0);

    expect(result).toBe(6);
  });

  it('should work without start value', () => {
    const arr = [1, 2, 3];
    const result = arr.reduce2((acc, val) => acc + val);

    expect(result).toBe(6);
  });

  it('should work with empty array and start value', () => {
    const arr = [];
    const result = arr.reduce2((acc, val) => acc + val, 10);

    expect(result).toBe(10);
  });

  it('should work with different types of values', () => {
    const arr = ['a', 'b', 'c'];
    const result = arr.reduce2((acc, val) => acc + val, '');

    expect(result).toBe('abc');
  });

  it('should pass correct arguments to callback', () => {
    const arr = [1, 2, 3];
    const callback = jest.fn((acc, val) => acc + val);

    arr.reduce2(callback, 0);
    expect(callback).toHaveBeenCalledWith(0, 1, 0, arr);
    expect(callback).toHaveBeenCalledWith(1, 2, 1, arr);
    expect(callback).toHaveBeenCalledWith(3, 3, 2, arr);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});
