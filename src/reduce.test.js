"use strict";

const { reduce } = require("./reduce");

describe("reduce", () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it("should sum up all elements in an array", () => {
    const arr = [1, 2, 3];
    const sum = arr.reduce2((acc, value) => acc + value, 0);

    expect(sum).toBe(6);
  });
  it("should multiply all elements in an array", () => {
    const arr = [1, 2, 3];
    const sum = arr.reduce2((acc, value) => acc * value, 1);

    expect(sum).toBe(6);
  });
  it("should concatenate an array of strings", () => {
    const arr = ["hello", " ", "world", "!"];
    const sum = arr.reduce2((acc, value) => acc + value, "");

    expect(sum).toBe("hello world!");
  });
  it("should merge an array into an object", () => {
    const arr = [
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ];
    const obj = arr.reduce2((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });
  it("should use first element as initial value when startValue is not provided", () => {
    const arr = [1, 2, 3];
    const sum = arr.reduce2((acc, value) => acc + value);

    expect(sum).toBe(6);
  });
  it('should handle an empty array with initial value', () => {
    const arr = [];
    const result = arr.reduce2((acc, val) => acc + val, 100);

    expect(result).toBe(100);
  });
  it('should call callback with correct arguments', () => {
    const callback = jest.fn((acc, val) => acc + val);
    const arr = [1, 2, 3];

    arr.reduce2(callback, 0);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(arr.length);
    expect(callback).toHaveBeenCalledWith(0, 1, 0, arr);
    expect(callback).toHaveBeenCalledWith(1, 2, 1, arr);
    expect(callback).toHaveBeenCalledWith(3, 3, 2, arr);
  });
});
