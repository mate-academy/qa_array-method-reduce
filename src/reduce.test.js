'use strict';

// eslint-disable-next-line no-extend-native
const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-extend-native
    Array.prototype.reduce2 = reduce;
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  let callback;

  beforeEach(() => {
    callback = jest.fn().mockImplementation((a, b) => a + b);
  });

  it('should be declared', () => {
    expect(reduce).toBeInstanceOf(Function);
  });

  it('should not mutate array', () => {
    const array = [1, 2, 3, 4];
    const copy = [...array];
    array.reduce2(callback, 0);
    expect(array).toEqual(copy);
  });

  it('should run callback array`s length times if initialValue is provided', () => {
    const array = [1, 2, 3, 4];
    array.reduce2(callback, 0);
    expect(callback).toHaveBeenCalledTimes(array.length);
  });

  it('should run callback array`s length - 1 times if no initialValue', () => {
    const array = [1, 2, 3, 4];
    array.reduce2(callback);
    expect(callback).toHaveBeenCalledTimes(array.length - 1);
  });

  it('should not run callback if array is empty and initialValue is provided', () => {
    const array = [];
    array.reduce2(callback, 0);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('should run callback with correct arguments when initialValue is provided', () => {
    const array = [1, 2, 3, 4];
    array.reduce2(callback, 0);

    expect(callback).toHaveBeenNthCalledWith(1, 0, 1, 0, array);
    expect(callback).toHaveBeenNthCalledWith(2, 1, 2, 1, array);
    expect(callback).toHaveBeenNthCalledWith(3, 3, 3, 2, array);
    expect(callback).toHaveBeenNthCalledWith(4, 6, 4, 3, array);
  });

  it('should return initial value if array is empty', () => {
    const array = [];
    const initialValue = 0;
    const result = array.reduce2(callback, initialValue);

    expect(result).toBe(initialValue);
  });

  it('should throw if array is empty and no initial value', () => {
    const array = [];
    expect(() => array.reduce2(callback)).toThrow(TypeError);
  });

  it('should skip empty slots in sparse arrays', () => {
    // eslint-disable-next-line no-sparse-arrays
    const array = [1, , 3];
    const result = array.reduce2((acc, cur) => acc + cur, 0);
    expect(result).toBe(4);
  });

  it('should handle leading holes without initialValue', () => {
    // eslint-disable-next-line no-sparse-arrays
    const array = [, , 3, 4];
    const result = array.reduce2((acc, cur) => acc + cur);
    expect(result).toBe(7); // accumulator = 3, then adds 4
  });

  it('should throw on all-holes array without initialValue', () => {
    const array = new Array(3); // [ , , , ]
    expect(() => array.reduce2(callback)).toThrow(TypeError);
  });

  it('should throw if callback is not a function', () => {
    const array = [1, 2];
    expect(() => array.reduce2(null)).toThrow(TypeError);
  });

  it('should have undefined as callback this in strict mode', () => {
    const array = [1];
    let recordedThis;
    array.reduce2(function (acc, cur) {
      recordedThis = this;
      return acc + cur;
    }, 0);
    expect(recordedThis).toBeUndefined();
  });

  it('should support array-like objects via call', () => {
    const obj = { 0: 1, 1: 2, length: 2 };
    const result = reduce.call(obj, (acc, cur) => acc + cur, 0);
    expect(result).toBe(3);
  });

  it('should throw if called on null/undefined', () => {
    expect(() => reduce.call(null, callback, 0)).toThrow(TypeError);
    expect(() => reduce.call(undefined, callback, 0)).toThrow(TypeError);
  });

  it('should ignore non-numeric properties', () => {
    const array = [1, 2, 3];
    // @ts-ignore
    array.foo = 10;
    // element beyond initial length
    array[100] = 100;

    const result = array.reduce2((acc, cur) => acc + cur, 0);
    expect(result).toBe(6); // only 1+2+3
  });

  it('should work with string concatenation', () => {
    const array = ['a', 'b', 'c'];
    const result = array.reduce2((acc, cur) => acc + cur, '');
    expect(result).toBe('abc');
  });

  it('should work with objects as accumulator', () => {
    const array = ['x', 'y'];
    const result = array.reduce2((acc, cur, i) => {
      acc[i] = cur;
      return acc;
    }, {});
    expect(result).toEqual({ 0: 'x', 1: 'y' });
  });
});
