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

  it('should be a function', () => {
    expect(typeof Array.prototype.reduce2).toBe('function');
  });

  it('should return startValue if the array is empty', () => {
    const items = [];
    const f1 = jest.fn((a, b) => a + b);

    const result = items.reduce2(f1, 10);

    expect(result).toBe(10);
    expect(f1).not.toHaveBeenCalled();
  });

  it('should work with an array of numbers', () => {
    const items = [1, 2, 3, 4, 5];
    const f1 = jest.fn((a, b) => a + b);

    const result = items.reduce2(f1, 0);

    expect(result).toBe(15);
    expect(f1).toHaveBeenCalledTimes(items.length);
  });

  it('should work with an array of strings', () => {
    const items = ['a', 'b', 'c'];
    const f1 = jest.fn((a, b) => a + b);

    const result = items.reduce2(f1, '');

    expect(result).toBe('abc');
    expect(f1).toHaveBeenCalledTimes(items.length);
  });

  it('should pass index as the third argument to the callback', () => {
    const items = ['a', 'b', 'c'];
    const f1 = jest.fn();

    items.reduce2((acc, val, index) => {
      f1(index);

      return acc + val;
    }, '');

    expect(f1).toHaveBeenCalledWith(0);
    expect(f1).toHaveBeenCalledWith(1);
    expect(f1).toHaveBeenCalledWith(2);
  });

  it('should pass the array itself as the fourth argument to the callback', () => {
    const items = [1, 2, 3];
    const f1 = jest.fn();

    items.reduce2((acc, val, index, array) => {
      f1(array);

      return acc + val;
    }, 0);

    expect(f1).toHaveBeenCalledWith(items);
  });
});
