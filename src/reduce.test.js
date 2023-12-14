'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should reduce an array without an initial value', () => {
    const arr = [1, 2, 3, 4, 5];
    const callback = jest.fn((acc, current) => acc + current);
    const result = arr.reduce2(callback);

    expect(callback).toHaveBeenCalledTimes(4);
    expect(result).toBe(15);
  });

  it('should reduce an array with an initial value', () => {
    const arr = [1, 2, 3, 4, 5];
    const callback = jest.fn((acc, current) => acc + current);
    const initialValue = 10;
    const result = arr.reduce2(callback, initialValue);

    expect(callback).toHaveBeenCalledTimes(5);
    expect(result).toBe(25);
  });
});
