'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
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

    array.reduce2(callback, 0);

    expect(array).toEqual(array);
  });

  it('should run callback array`s length times if initialValue is', () => {
    const array = [1, 2, 3, 4];

    array.reduce2(callback, 0);

    expect(callback).toHaveBeenCalledTimes(array.length); ;
  });

  it('should run callback array`s length - 1 times if no initialValue', () => {
    const array = [1, 2, 3, 4];

    array.reduce2(callback);

    expect(callback).toHaveBeenCalledTimes(array.length - 1); ;
  });

  it('should not run callback if array is empty', () => {
    const array = [];

    array.reduce2(callback);

    expect(callback).toHaveBeenCalledTimes(0); ;
  });

  it('should run callback with correct arguments', () => {
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

    expect(result).toBe(initialValue); ;
  });

  it('should return undefined if array is empty and no initial value', () => {
    const array = [];
    const result = array.reduce2(callback);

    expect(result).toBe(undefined); ;
  });
});
