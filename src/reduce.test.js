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

  it('should sum up numbers with initial value', () => {
    const result = [1, 2, 3, 4].reduce2((acc, val) => acc + val, 10);

    expect(result).toBe(20);
  });

  it('should sum up numbers without initial value', () => {
    const result = [1, 2, 3, 4].reduce2((acc, val) => acc + val);

    expect(result).toBe(10);
  });

  it('should concatenate strings', () => {
    const result = ['a', 'b', 'c'].reduce2((acc, val) => acc + val, '');

    expect(result).toBe('abc');
  });

  it('should multiply numbers without initial value', () => {
    const result = [2, 3, 4].reduce2((acc, val) => acc * val);

    expect(result).toBe(24);
  });

  it('should use array index and array as arguments', () => {
    const spy = jest.fn((acc, val, i, array) => acc + val);
    const arr = [1, 2, 3];

    arr.reduce2(spy, 0);
    expect(spy).toHaveBeenCalledWith(0, 1, 0, arr);
    expect(spy).toHaveBeenCalledWith(1, 2, 1, arr);
    expect(spy).toHaveBeenCalledWith(3, 3, 2, arr);
  });

  it('should work on array with single element and no initial value', () => {
    const result = [42].reduce2((acc, val) => acc + val);

    expect(result).toBe(42);
  });

  it('should throw error on empty array with no initial value', () => {
    expect(() => [].reduce2((acc, val) => acc + val)).toThrow();
  });

  it('should return initial value on empty array if initial value provided', () => {
    const result = [].reduce2((acc, val) => acc + val, 100);

    expect(result).toBe(100);
  });
});
