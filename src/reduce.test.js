'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should be defined', () => {
    expect([].reduce2)
      .toBeInstanceOf(Function);
  });

  it('should returns `startValue` for empty array: []', () => {
    expect([].reduce2(x => x, 10))
      .toBe(10);
  });

  it('should runs callback the correct number of times', () => {
    const callback = jest.fn();
    const data = [0, 1, 2, 3];

    data.reduce2(callback, 9);

    expect(callback)
      .toHaveBeenCalledTimes(data.length);
  });

  it('should runs callback with the correct parameters', () => {
    const callback = jest.fn((sum, item) => sum + item);
    const data = [0, 1, 2];

    data.reduce2(callback, 10);

    expect(callback).toHaveBeenNthCalledWith(1, 10, 0, 0, data);
    expect(callback).toHaveBeenNthCalledWith(2, 10, 1, 1, data);
    expect(callback).toHaveBeenNthCalledWith(3, 11, 2, 2, data);
  });

  it(`should return correct value
   for reduce2((sum, item) => sum + item, 10)`, () => {
    const data = [0, 1, 2, 3];

    expect(data.reduce2((sum, x) => sum + x, 10))
      .toBe(16);
  });

  it(`should return correct value
   for (sum, item, index) => sum + index`, () => {
    const data = [0, 1, 2, 3];

    expect(data.reduce2((sum, item, index) => sum + index))
      .toBe(6);
  });
});
