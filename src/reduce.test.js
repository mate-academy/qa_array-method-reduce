"use strict";

const { reduce } = require("./reduce");

describe("reduce", () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce;
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it("should be declared and be an instance of Function", () => {
    expect(reduce).toBeInstanceOf(Function);
  });

  it("should call a callback once per item if initialValue specified", () => {
    const items = [1, 2, 3, 4, 5];
    const f = jest.fn();

    items.reduce2(f, 0);

    expect(f).toHaveBeenCalledTimes(5);
  });

  it(
    "should call a callback (array.length - 1) times" +
      " if initialValue did not specified",
    () => {
      const items = [1, 2, 3, 4, 5];
      const f = jest.fn();

      items.reduce2(f);

      expect(f).toHaveBeenCalledTimes(4);
    }
  );

  it("should not call a callback for an empty array", () => {
    const f = jest.fn();

    [].reduce2(f);

    expect(f).not.toHaveBeenCalled();
  });

  it("should return initialValue for an empty array", () => {
    const f = jest.fn();

    const result = [].reduce2(f, 5);

    expect(result).toBe(5);
  });

  it(
    "should pass value from the previous call," +
      " an element, an index and an array to a callback",
    () => {
      const items = [10, 20, 30, 40];
      const f = jest.fn((prev, current) => prev + current);

      items.reduce2(f, 0);

      expect(f).toHaveBeenNthCalledWith(1, 0, 10, 0, items);
      expect(f).toHaveBeenNthCalledWith(2, 10, 20, 1, items);
      expect(f).toHaveBeenNthCalledWith(3, 30, 30, 2, items);
      expect(f).toHaveBeenNthCalledWith(4, 60, 40, 3, items);
    }
  );

  it("should return correct value", () => {
    const items = [10, 20, 30, 40];
    const f = jest.fn((prev, current) => prev + current);

    const result = items.reduce2(f, 0);

    expect(result).toBe(100);
  });
});
