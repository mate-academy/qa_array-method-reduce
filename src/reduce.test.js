'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should sum numbers in an array', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.reduce2((acc, val) => acc + val, 0);
    expect(result).toBe(10);
  });

  it('should multiply numbers in an array', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.reduce2((acc, val) => acc * val, 1);
    expect(result).toBe(24);
  });

  it('should work without initial value', () => {
    const arr = [1, 2, 3];
    const result = arr.reduce2((acc, val) => acc + val);
    expect(result).toBe(6);
  });

  it('should handle empty array with initial value and not call callback', () => {
    const arr = [];
    const cb = jest.fn();
    const result = arr.reduce2(cb, 5);
    expect(result).toBe(5);
    expect(cb).toHaveBeenCalledTimes(0);
  });

  it('should throw TypeError when empty array and no initial value', () => {
    const arr = [];
    expect(() => arr.reduce2((acc, val) => acc + val)).toThrow(TypeError);
  });

  it('should throw TypeError if callback is not a function', () => {
    const arr = [1, 2, 3];
    expect(() => arr.reduce2(null, 0)).toThrow(TypeError);
  });

  it('should handle single-element array without initial', () => {
    const arr = [5];
    const cb = jest.fn((acc, val) => acc + val);
    const result = arr.reduce2(cb);
    expect(result).toBe(5);
    expect(cb).toHaveBeenCalledTimes(0);
  });

  it('should handle single-element array with initial', () => {
    const arr = [5];
    const cb = jest.fn((acc, val) => acc + val);
    const result = arr.reduce2(cb, 10);
    expect(result).toBe(15);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should skip holes in sparse arrays', () => {
    const arr = [1, , 3];
    const cb = jest.fn((acc, val) => acc + val);
    arr.reduce2(cb, 0);
    expect(cb).toHaveBeenCalledTimes(2);
  });

  it('should not process elements added after reduction starts', () => {
    const arr = [1, 2];
    const result = arr.reduce2((acc, val, idx, array) => {
      if (idx === 0) array.push(3);
      return acc + val;
    }, 0);
    expect(result).toBe(3);
  });

  it('should pass correct arguments to callback', () => {
    const arr = [10, 20];
    const mockCb = jest.fn((acc, val, idx, array) => acc + val);
    arr.reduce2(mockCb, 0);
    expect(mockCb).toHaveBeenCalledTimes(2);
    expect(mockCb).toHaveBeenNthCalledWith(1, 0, 10, 0, arr);
    expect(mockCb).toHaveBeenNthCalledWith(2, 10, 20, 1, arr);
  });

  it('callback this should be undefined in strict mode', () => {
    const arr = [1, 2];
    let thisArg;
    arr.reduce2(function(acc, val) { thisArg = this; return acc + val; }, 0);
    expect(thisArg).toBeUndefined();
  });

  it('should not modify the original array', () => {
    const arr = [1, 2, 3];
    const copy = [...arr];
    arr.reduce2((acc, val) => acc + val, 0);
    expect(arr).toEqual(copy);
  });

  it('should accumulate strings', () => {
    const arr = ['a', 'b', 'c'];
    const result = arr.reduce2((acc, val) => acc + val, '');
    expect(result).toBe('abc');
  });

  it('should accumulate objects', () => {
    const arr = [{a:1},{b:2}];
    const result = arr.reduce2((acc, val) => ({ ...acc, ...val }), {});
    expect(result).toEqual({a:1,b:2});
  });
});
