'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should call callback for each array element', () => {
    const array = [1, 3, 5, 6];
    const cb = jest.fn((acc, curr) => acc + curr);

    array.reduce2(cb, 0);

    expect(cb).toHaveBeenCalledTimes(4);

    expect(cb).toHaveBeenNthCalledWith(1, 0, 1, 0, array);
    expect(cb).toHaveBeenNthCalledWith(2, 1, 3, 1, array);
    expect(cb).toHaveBeenNthCalledWith(3, 4, 5, 2, array);
    expect(cb).toHaveBeenNthCalledWith(4, 9, 6, 3, array);
  });

  it('uses first element as initial value if startValue is omitted', () => {
    const array = [9, 2, 6, 6];

    const result = array.reduce2((acc, curr) => acc + curr);

    expect(result).toBe(23);
  });

  it('starts with index 1 if no startValue is provided', () => {
    const array = [9, 2, 6, 6];

    const cb = jest.fn((acc, curr) => acc + curr);

    array.reduce2(cb);

    expect(cb).toHaveBeenCalledTimes(3);

    expect(cb).toHaveBeenNthCalledWith(1, 9, 2, 1, array);
    expect(cb).toHaveBeenNthCalledWith(2, 11, 6, 2, array);
    expect(cb).toHaveBeenNthCalledWith(3, 17, 6, 3, array);
  });

  it('array has one element and no startValue is provided', () => {
    const array = [5];

    const result = array.reduce2((acc, curr) => acc + curr);

    expect(result).toBe(5);
  });

  it('returns initial value when array is empty', () => {
    const array = [];
    const cb = jest.fn((acc, curr) => acc + curr);

    const result = array.reduce2(cb, 2);

    expect(result).toBe(2);
    expect(cb).not.toHaveBeenCalled();
  });

  it('skips holes in sparse arrays', () => {
    const array = new Array(3);

    array[0] = 1;
    array[2] = 3;

    const cb = jest.fn((acc, curr) => acc + curr);

    const result = array.reduce2(cb, 0);

    expect(result).toBeNaN();

    expect(cb).toHaveBeenCalledTimes(3);
    expect(cb).toHaveBeenNthCalledWith(1, 0, 1, 0, array);
    expect(cb).toHaveBeenNthCalledWith(2, 1, undefined, 1, array);
    expect(cb).toHaveBeenNthCalledWith(3, NaN, 3, 2, array);
  });
});
