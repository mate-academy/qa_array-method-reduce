'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  const items = [10, 20, 30, 40];

  it(`should be declared`, () => {
    expect(reduce).toBeInstanceOf(Function);
  });

  it(`should call a callback for each item `
    + `if start value is specified`, () => {
    const cb = jest.fn((prev, item) => prev + item);

    items.reduce2(cb, 10);

    expect(cb).toHaveBeenCalledTimes(4);
  });

  it(`should call a callback for each item starting from 2nd item `
    + `if start value isn't specified`, () => {
    const cb = jest.fn((prev, item) => prev + item);

    items.reduce2(cb);

    expect(cb).toHaveBeenCalledTimes(3);
  });

  it(`should return correct result`, () => {
    const cb = (prev, item) => prev + item;

    const result = items.reduce2(cb);

    expect(result).toBe(100);
  });

  it(`should return the array item for the array with one item `
    + `if start value isn't specified`, () => {
    const cb = (prev, item) => prev + item;

    const result = [10].reduce2(cb);

    expect(result).toBe(10);
  });

  it(`should return the start value for the empty array `
    + `if start value is specified`, () => {
    const cb = (prev, item) => prev + item;
    const startValue = 10;

    const result = [].reduce2(cb, startValue);

    expect(result).toBe(startValue);
  });

  it(`should pass indexes to the callback`, () => {
    const cb = (prev, item, i) => prev + i;

    const result = items.reduce2(cb);

    expect(result).toBe(16);
  });

  it(`should pass the array to the callback`, () => {
    const cb = (prev, item, i, arr) => arr === items ? prev + 1 : 0;

    const result = items.reduce2(cb, 0);

    expect(result).toBe(4);
  });

  /*
  I decided to add this test because in the original reduce() method
  if the array is empty and start value isn't specified
  then and error is trown
  */
  it(`should throw error if the array is empty `
    + `and start value isn't specified`, () => {
    const cb = (prev, item) => prev + item;

    const result = jest.fn([].reduce2(cb));

    expect(result).toThrow();
  });
});
