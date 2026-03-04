'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should call a callback for every item in an array', () => {
    const cb = jest.fn();

    [1, 2, 3, 4].reduce2(cb, 0);
    expect(cb).toHaveBeenCalledTimes(4);
  });

  // Add tests here

  it(`should call a callback for every item in an array
    (minus one when no initial value is provided)`, () => {
    const cb = jest.fn();

    [1, 2, 3, 4].reduce2(cb);
    expect(cb).toHaveBeenCalledTimes(3);
  });

  it(`should not call a callback and return initial value
      if array is empty`, () => {
    const cb = jest.fn();
    const result = [].reduce2(cb, 0);

    expect(cb).not.toHaveBeenCalled();
    expect(result).toBe(0);
  });

  it(`should throw a TypeError if array is empty
      while no initial value is given`, () => {
    const cb = jest.fn();

    expect(() => [].reduce2(cb)).toThrow(TypeError);
  });

  it(`should return an item from array with a single item
      when no initial value is given`, () => {
    const cb = jest.fn();
    const result = [1].reduce2(cb);

    expect(cb).not.toHaveBeenCalled();
    expect(result).toBe(1);
  });

  it('should pass an accumulator and current value to a callback', () => {
    const cb = jest.fn((acc, curr) => acc + curr);

    [1, 2, 3, 4].reduce2(cb, 0);

    expect(cb).toHaveBeenNthCalledWith(
      4,
      6,
      4,
      expect.anything(),
      expect.anything(),
    );
  });

  it('should return a value', () => {
    expect([].reduce2(() => {}, 0)).toBeDefined();
  });

  it('should correctly return a value calculated from an array', () => {
    const cb = jest.fn((acc, curr) => acc + curr);
    const result = [1, 2, 3, 4].reduce2(cb, 0);

    expect(result).toBe(10);
  });
});
