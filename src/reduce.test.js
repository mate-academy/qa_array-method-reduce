'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it(`should be declared`, () => {
    expect(Array.prototype.reduce2).toBeInstanceOf(Function);
  });

  it(`should call callback once with the correct arguments when initialValue is omitted`, () => {
    const array = [1, 100];
    const getMax = (a, b) => Math.max(a, b);
    const result = array.reduce2(getMax, 50);

    expect(result).toBe(100);
  });

  it(`should be called`, () => {
    const array = [1, 100];
    const fn = jest.fn();

    array.reduce2(fn);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1, 100, 1, array);
  });

  it(`should not invoke callback for an array with one element and no initialValue`, () => {
    const array = [50];
    const getMax = jest.fn((a, b) => Math.max(a, b));

    array.reduce2(getMax);

    expect(getMax).not.toHaveBeenCalled();
  });

  it(`should return Undefined`, () => {
    const array = [];
    const getMax = (a, b) => Math.max(a, b);

    expect(array.reduce2(getMax)).toBeUndefined();
  });

  it(`should invoke callback four times when initialValue is provided`, () => {
    const array = [1, 2, 3, 4];
    const fn = jest.fn();

    array.reduce2(fn, 1);

    expect(fn).toHaveBeenCalledTimes(4);
  });

  it(`should invoke callback three times when initialValue is omitted`, () => {
    const array = [1, 2, 3, 4];
    const fn = jest.fn();

    array.reduce2(fn);

    expect(fn).toHaveBeenCalledTimes(3);
  });

  it(`should return TypeError if callback not given`, () => {
    const array = [1, 100];

    expect(() => array.reduce2()).toThrow(TypeError);
  });

  it('should pass the correct index to callback', () => {
    const array = [10, 20, 30, 40];
    const fn = jest.fn((acc, current) => acc + current);

    array.reduce2(fn, 0);

    expect(fn).toHaveBeenNthCalledWith(1, 0, 10, 0, array);
    expect(fn).toHaveBeenNthCalledWith(2, 10, 20, 1, array);
    expect(fn).toHaveBeenNthCalledWith(3, 30, 30, 2, array);
    expect(fn).toHaveBeenNthCalledWith(4, 60, 40, 3, array);
  });

  it('hould return initialValue when the array is empty', () => {
    const fn = jest.fn((acc, current) => acc + current);
    const initialValue = 2;

    const result = [].reduce2(fn, initialValue);

    expect(fn).not.toHaveBeenCalled();
    expect(result).toBe(initialValue);
  });
});
