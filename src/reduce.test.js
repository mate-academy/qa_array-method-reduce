'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should run callback the correct number of times', () => {
    const callback = jest.fn();

    [1, 2, 3, 4, 5].reduce2(callback, 5);

    expect(callback).toHaveBeenCalledTimes(5);
  });

  it('should return `startValue` if array is empty', () => {
    const sum = [].reduce2((a, b) => a + b, 4);

    expect(sum).toBe(4);
  });

  it('should run callback with the correct parameters', () => {
    const callback = jest.fn((a, b) => a + b);

    [1, 2, 3, 4, 5].reduce2(callback, 5);

    expect(callback.mock.calls[0]).toEqual([5, 1, 0, [1, 2, 3, 4, 5]]);
    expect(callback.mock.calls[1]).toEqual([6, 2, 1, [1, 2, 3, 4, 5]]);
    expect(callback.mock.calls[2]).toEqual([8, 3, 2, [1, 2, 3, 4, 5]]);
    expect(callback.mock.calls[3]).toEqual([11, 4, 3, [1, 2, 3, 4, 5]]);
    expect(callback.mock.calls[4]).toEqual([15, 5, 4, [1, 2, 3, 4, 5]]);
  });

  it('should return the correct value', () => {
    const sum = [1, 2, 3, 4, 5].reduce2((a, b) => a + b, 3);

    expect(sum).toBe(18);
  });
});
