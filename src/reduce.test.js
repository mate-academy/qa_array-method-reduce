"use strict";

const { reduce } = require("./reduce");

describe("reduce", () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it("should apply a callback function and return the reduced value", () => {
    const arr = [1, 2, 3, 4, 5];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const initialValue = 0;

    const result = arr.reduce2(reducer, initialValue);
    const expected = arr.reduce(reducer, initialValue);

    expect(result).toBe(expected);
  });

  it("should handle cases with an initial value", () => {
    const arr = [1, 2, 3, 4, 5];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const initialValue = 10;

    const result = arr.reduce2(reducer, initialValue);
    const expected = arr.reduce(reducer, initialValue);

    expect(result).toBe(expected);
  });

  it("should work with an empty array", () => {
    const arr = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const initialValue = 0;

    const result = arr.reduce2(reducer, initialValue);
    const expected = arr.reduce(reducer, initialValue);

    expect(result).toBe(expected);
  });

  it("should work without an initial value", () => {
    const arr = [1, 2, 3, 4, 5];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    const result = arr.reduce2(reducer);
    const expected = arr.reduce(reducer);

    expect(result).toBe(expected);
  });

  it("should handle array contains undefined or empty elements", () => {
    const arr = [1, undefined, 2, "", 3, null, 4, false, 5];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const initialValue = 0;

    const result = arr.reduce2(reducer, initialValue);
    const expected = arr.reduce(reducer, initialValue);

    expect(result).toBe(expected);
  });
});
