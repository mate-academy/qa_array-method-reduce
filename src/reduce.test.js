"use strict";

const { reduce } = require("./reduce");

describe("reduce", () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it(`should be declared`, () => {
    expect(Array.prototype.reduce2).toBeInstanceOf(Function);
  });

  it(`should be correctly if 'startValue' === 0`, () => {
    const result = [1, 2, 3].reduce2((acc, num) => acc + num, 0);

    expect(result).toBe(6);
  });

  it(`should be correctly if 'startValue' > 0`, () => {
    const result = [1, 2, 3].reduce2((acc, num) => acc + num, 6);

    expect(result).toBe(12);
  });

  it(`should be correctly if without 'startValue'`, () => {
    const result = [1, 2, 3].reduce2((acc, num) => acc + num);

    expect(result).toBe(6);
  });

  it(`should be correctly if string array`, () => {
    const result = ["Dima", " ", "Boiko"].reduce2((acc, str) => acc + str);

    expect(result).toBe("Dima Boiko");
  });

  it("should pass the correct parameters to the callback", () => {
    const mockCallback = jest.fn((acc, num, index, array) => acc + num);

    [1, 2, 3].reduce2(mockCallback, 0);

    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenCalledWith(0, 1, 0, [1, 2, 3]);
    expect(mockCallback).toHaveBeenCalledWith(1, 2, 1, [1, 2, 3]);
    expect(mockCallback).toHaveBeenCalledWith(3, 3, 2, [1, 2, 3]);
  });
});
