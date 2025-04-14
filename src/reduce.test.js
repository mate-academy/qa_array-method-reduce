'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should be declared', () => {
    expect(reduce).toBeInstanceOf(Function);
  });

  it('should be called once for each item in the array', () => {
    const items = [1, 2, 3];

    const f = jest.fn();

    items.reduce2(f, 0);
    expect(f).toHaveBeenCalledTimes(3);
  });

  it('should not called with an empty array', () => {
    const f = jest.fn();

    [].reduce2(f);
    expect(f).not.toHaveBeenCalled();
  });

  it('should work with array of numbers', () => {
    const items = [1, 2, 3];

    const result = items.reduce2((acc, curr) => acc + curr, 0);

    expect(result).toBe(6);
  });

  it('should work correct without initial value', () => {
    const items = [1, 2, 3];

    const result = items.reduce2((acc, curr) => acc + curr);

    expect(result).toBe(6);
  });

  it('should work correct with array.length < 2', () => {
    const items = [1];

    const result = items.reduce2((acc, curr) => acc + curr);

    expect(result).toBe(1);
  });

  it('should accept index', () => {
    const items = ['a', 'b', 'c'];

    const result = items.reduce2((acc, curr, index) => {
      acc[index] = curr;

      return acc;
    }, {});

    expect(result).toEqual({
      0: 'a', 1: 'b', 2: 'c',
    });
  });
});
