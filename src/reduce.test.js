'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  // Add tests here

  it('should return initialValue for an empty array', () => {
    const f = jest.fn();

    const result = [].reduce2(f, 5);

    expect(result).toBe(5);
  });

  it('should pass value from the previous call,'
  + 'an element, an index and an array to a callback', () => {
    const items = [10, 20, 30, 40];
    const f = jest.fn((prev, current) => prev + current);

    items.reduce2(f, 0);

    expect(f).toHaveBeenNthCalledWith(1, 0, 10, 0, items);
    expect(f).toHaveBeenNthCalledWith(2, 10, 20, 1, items);
    expect(f).toHaveBeenNthCalledWith(3, 30, 30, 2, items);
    expect(f).toHaveBeenNthCalledWith(4, 60, 40, 3, items);
  });

  it('should return correct value', () => {
    const items = [10, 20, 30, 40];
    const f = jest.fn((prev, current) => prev + current);

    const result = items.reduce2(f, 0);

    expect(result).toBe(100);
  });
});
