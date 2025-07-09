'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('Func should return sum of all elements when used with sum callback '
    + 'and without second parameter', () => {
    const arr = [1, 2, 3, 4, 5];
    const callBack = jest.fn((res, el) => res + el);

    expect(arr.reduce2(callBack)).toBe(15);
    expect(callBack).toHaveBeenCalledTimes(arr.length - 1);
  });

  it('Func should work right with the second parameter (start value)', () => {
    const arr = [1, 2, 3, 4, 5];
    const callBack = jest.fn((res, el) => res + el);

    expect(arr.reduce2(callBack, 5)).toBe(20);
  });

  it('Func should return start value when arr is empty', () => {
    const arr = [];
    const callBack = jest.fn((res, el) => res + el);

    expect(arr.reduce2(callBack, 0)).toBe(0);
  });

  it('Func should return first value when second parameter is empty', () => {
    const arr = ['s'];
    const callBack = jest.fn((res, el) => res + el);

    expect(arr.reduce2(callBack)).toBe('s');
  });

  it('should call callback functions only on existing elements '
    + 'in sparse functions', () => {
    // eslint-disable-next-line no-sparse-arrays
    const arr = ['s', , 'a'];
    const callBack = jest.fn((res, el) => res + el);

    expect(arr.reduce2(callBack)).toBe('sundefineda');
    expect(callBack).toHaveBeenCalledTimes(2);
  });

  it('check for immutability', () => {
    const arr = ['s', 'a'];
    const copy = [...arr];
    const callBack = jest.fn((res, el) => res + el);

    arr.reduce2(callBack);

    expect(arr).toEqual(copy);
  });

  it('should throw an error when reducing an empty array without '
  + 'an initial value', () => {
    const callBack = jest.fn((res, el) => res + el);

    expect(() => [].reduce2(callBack)).toThrow(TypeError);
  });

  it('callback is not called with correct arguments on each call', () => {
    const callBack = jest.fn((res, el) => res + el);
    const arr = [1, 2, 3];

    arr.reduce2(callBack);

    expect(callBack).toHaveBeenCalledTimes(2);

    expect(callBack.mock.calls).toEqual([
      [1, 2, 1, arr],
      [3, 3, 2, arr],
    ]);
  });
});
