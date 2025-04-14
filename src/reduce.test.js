"use strict";

const { reduce } = require("./reduce");

describe(`reduce`, () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it(`should cb once per time`, () => {
    const array = [1, 2, 3, 4];
    const startValue = 0;
    const cb = jest.fn();

    array.reduce2(cb, startValue);

    expect(cb).toHaveBeenCalledTimes(4);
  });

  it(`should not call a cb for an empty array`, () => {
    const array = [];
    const startValue = 10;
    const cb = jest.fn();

    const result = array.reduce2(cb, startValue);

    expect(result).toEqual(10);
    expect(cb).not.toHaveBeenCalled();
  });

  it(`should return the correct result`, () => {
    const array = [1, 2, 3, 4, 6];
    const startValue = 0;
    const cb = jest.fn((acc, curr) => acc + curr);

    const result = array.reduce2(cb, startValue);

    expect(result).toEqual(16);
    expect(result).toEqual(array.reduce((acc, curr) => acc + curr, startValue));
  });

  it(`should return the single element`, () => {
    const array = [50];
    const cb = jest.fn();

    const result = array.reduce2(cb);

    expect(result).toEqual(50);
    expect(cb).not.toHaveBeenCalled();
  });

  it(`should return the single element and an initial value`, () => {
    const array = [50];
    const startValue = 5;
    const cb = jest.fn((acc, curr) => acc + curr);

    const result = array.reduce2(cb, startValue);

    expect(result).toBe(55);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});
