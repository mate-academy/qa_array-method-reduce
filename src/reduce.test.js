'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should return `startValue` if array is empty', () => {
    const sum = [].reduce2((a, b) => a + b, 9);

    expect(sum).toBe(9);
  });

  it('should run callback the correct number of times', () => {
    const callback = jest.fn();

    [1, 2, 3, 4, 5].reduce2(callback, 9);

    expect(callback).toHaveBeenCalledTimes(5);
  });

  it('should run callback with the correct parameters', () => {
    const callback = jest.fn((a, b) => a + b);

    [1, 2, 3, 4, 5].reduce2(callback, 9);

    expect(callback.mock.calls[0]).toEqual([9, 1, 0, [1, 2, 3, 4, 5]]);
    expect(callback.mock.calls[1]).toEqual([10, 2, 1, [1, 2, 3, 4, 5]]);
    expect(callback.mock.calls[2]).toEqual([12, 3, 2, [1, 2, 3, 4, 5]]);
    expect(callback.mock.calls[3]).toEqual([15, 4, 3, [1, 2, 3, 4, 5]]);
    expect(callback.mock.calls[4]).toEqual([19, 5, 4, [1, 2, 3, 4, 5]]);
  });

  it('should return the correct value', () => {
    const sum = [1, 2, 3, 4, 5].reduce2((a, b) => a + b, 10);

    expect(sum).toBe(25);
  });
});
