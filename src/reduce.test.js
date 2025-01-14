'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  const testArr = [1, 10, 15, 20, 50, 100];

  let cb;

  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  beforeEach(() => {
    cb = jest.fn((...args) => {
      return [...args][0] + [...args][1];
    });
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should return value', () => {
    const result = testArr.reduce2(cb, 0);

    expect(result).not.toBeUndefined();
  });

  it('callback should be called array.length times', () => {
    testArr.reduce2(cb, 0);

    expect(cb.mock.calls.length).toBe(testArr.length);
  });

  it('callback should be called with four arguments', () => {
    testArr.reduce2(cb, 0);

    expect(cb.mock.calls[0].length).toBe(4);
    expect(cb.mock.calls[0]).toEqual([0, 1, 0, testArr]);
  });

  it('returns start value for the empty array', () => {
    const result = [].reduce2(cb, 1000);

    expect(result).toBe(1000);
  });

  it('callback shouldn`t be called for the empty array', () => {
    [].reduce2(cb, 1000);

    expect(cb.mock.calls.length).toBeFalsy();
  });
});
