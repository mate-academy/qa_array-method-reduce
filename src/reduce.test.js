'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it(
    `should call cb exactly as many times as the array length if`
      + ` startValue exists`,
    () => {
      const items = [1, 2, 3, 4, 5, 6];

      const f = jest.fn();

      items.reduce2(f, 0);

      expect(f).toHaveBeenCalledTimes(items.length);
    }
  );

  it(`should call cb exactly as many times as the array length - 1 if`
    + ` startValue does not exist`, () => {
    const items = [1, 2, 3, 4, 5, 6];

    const f = jest.fn();

    items.reduce2(f);

    expect(f).toHaveBeenCalledTimes(items.length - 1);
  });

  it('should correctly sum an array of numbers', () => {
    const items = [1, 2, 3, 4, 5, 6];
    const result = items.reduce2((acc, curr) => acc + curr, 0);

    expect(result).toBe(21);
  });

  it('should correctly multiply an array of numbers', () => {
    const items = [1, 2, 3, 4, 5, 6];
    const result = items.reduce2((acc, curr) => acc * curr, 1);

    expect(result).toBe(720);
  });

  it(`should return initial value if array is empty and startValue`
    + ` is exist`, () => {
    const items = [];
    const f = jest.fn();
    const result = items.reduce2(f, 10);

    expect(result).toBe(10);
  });

  it(`should return the single element if array has one element`
    + ` and no initial value is provided`, () => {
    const items = [42];
    const f = jest.fn();
    const result = items.reduce2(f);

    expect(result).toBe(42);
  });

  it('should correctly reduce an array of strings', () => {
    const items = ['a', 'b', 'c'];
    const result = items.reduce2((acc, curr) => acc + curr, '');

    expect(result).toBe('abc');
  });

  it('should pass the correct arguments to the callback', () => {
    const items = [1, 2, 3];
    const callback = jest.fn((acc, curr, index, array) => acc + curr);

    items.reduce2(callback, 0);

    expect(callback).toHaveBeenCalledWith(0, 1, 0, items);
    expect(callback).toHaveBeenCalledWith(1, 2, 1, items);
    expect(callback).toHaveBeenCalledWith(3, 3, 2, items);
  });
});
