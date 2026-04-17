'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  let callback;

  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  beforeEach(() => {
    callback = jest.fn();
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should throw an error if callback is not a function', () => {
    const testArr = [1, 2, 3];

    const res = () => testArr.reduce2(null, 1);

    expect(res).toThrow(TypeError);
  });

  it('should call cb for each value', () => {
    const testArr = [1, 2, 3];

    testArr.reduce2(callback, 0);

    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('should pass to cb prevValue, value, index and array', () => {
    const testArr = [1, 2, 3];

    testArr.reduce2(callback, 0);

    expect(callback).toHaveBeenNthCalledWith(1, 0, 1, 0, [1, 2, 3]);
  });

  it('should work without startValue', () => {
    const testArr = [1, 2, 3];

    testArr.reduce2(callback);

    expect(callback).toHaveBeenNthCalledWith(1, 1, 2, 1, [1, 2, 3]);
  });

  it('should work with empty array with start value', () => {
    const testArr = [];

    const result = testArr.reduce2(callback, 1);

    expect(callback).toHaveBeenCalledTimes(0);
    expect(result).toEqual(1);
  });

  it('should work with empty array without start value', () => {
    const testArr = [];

    const result = () => testArr.reduce2(callback);

    expect(callback).toHaveBeenCalledTimes(0);
    expect(result).toThrow(TypeError);
  });

  it('should work with one item', () => {
    const testArr = [1];

    callback.mockReturnValue(2);

    const result = testArr.reduce2(callback, 1);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(result).toEqual(2);
  });

  it('should work with one item without start value', () => {
    const testArr = [1];

    const result = testArr.reduce2(callback);

    expect(callback).toHaveBeenCalledTimes(0);
    expect(result).toEqual(1);
  });
});
