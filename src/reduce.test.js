"use strict";

const { reduce } = require("./reduce");

describe("reduce", () => {
  const accumulatorReducer = (accumulator, currentValue) => {
    if (typeof currentValue === "number") {
      return accumulator + currentValue;
    }
    return accumulator;
  };

  it("should apply a callback function and return the reduced value", () => {
    const arr = [1, 2, 3, 4, 5];
    const initialValue = 0;

    const result = reduce(arr, accumulatorReducer, initialValue);
    const expected = 15;

    expect(result).toBe(expected);
  });

  it("should handle cases with an initial value", () => {
    const arr = [1, 2, 3, 4, 5];
    const initialValue = 10;

    const result = reduce(arr, accumulatorReducer, initialValue);
    const expected = 25;

    expect(result).toBe(expected);
  });

  it("should work with an empty array", () => {
    const arr = [];
    const emptyArrayReducer = (accumulator, currentValue) =>
      accumulator + currentValue;
    const initialValue = 0;

    const result = reduce(arr, emptyArrayReducer, initialValue);
    const expected = 0;

    expect(result).toBe(expected);
  });

  it("should work without an initial value", () => {
    const arr = [1, 2, 3, 4, 5];

    const result = reduce(arr, accumulatorReducer);
    const expected = 15;

    expect(result).toBe(expected);
  });

  it("should handle array containing undefined or empty elements", () => {
    const arr = [1, undefined, 2, "", 3, null, 4, false, 5];
    const initialValue = 0;

    const result = reduce(arr, accumulatorReducer, initialValue);
    const expected = 15;
    expect(result).toBe(expected);
  });
});
