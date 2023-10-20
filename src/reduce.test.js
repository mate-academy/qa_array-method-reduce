"use strict";

const { reduce } = require("./reduce");

describe("reduce", () => {
  const reducer = (accumulator, currentValue) => {
    if (typeof currentValue === 'number') {
      return accumulator + currentValue;
    }
    return accumulator;
  };

  it("should apply a callback function and return the reduced value", () => {
    const arr = [1, 2, 3, 4, 5];
    const initialValue = 0;

    const result = reduce(arr, reducer, initialValue);
    const expected = 15; // Explicitly define the expected result

    expect(result).toBe(expected);
  });

  it("should handle cases with an initial value", () => {
    const arr = [1, 2, 3, 4, 5];
    const initialValue = 10;

    const result = reduce(arr, reducer, initialValue);
    const expected = 25; // Explicitly define the expected result

    expect(result).toBe(expected);
  });

  it("should work with an empty array", () => {
    const arr = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const initialValue = 0;

    const result = reduce(arr, reducer, initialValue);
    const expected = 0; // Explicitly define the expected result for an empty array

    expect(result).toBe(expected);
  });

  it("should work without an initial value", () => {
    const arr = [1, 2, 3, 4, 5];

    const result = reduce(arr, reducer);
    const expected = 15; // Explicitly define the expected result

    expect(result).toBe(expected);
  });

  it("should handle array containing undefined or empty elements", () => {
    const arr = [1, undefined, 2, "", 3, null, 4, false, 5];
    const initialValue = 0;

    const result = reduce(arr, reducer, initialValue);
    const expected = 15; // Explicitly define the expected result

    expect(result).toBe(expected);
  });
});
