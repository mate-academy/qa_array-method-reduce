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

  it('should not call a callback for an empty array', () => {
    const f = jest.fn();

    expect(f).not.toHaveBeenCalled();
  });

  it('should call a callback once per item', () => {
    const f = jest.fn();

    [1, 2, 3].reduce(f, 0);

    expect(f).toHaveBeenCalledTimes(3);
  });

  it('should work without startValue', () => {
    const f
      = jest.fn((accumulator, currentValue) => accumulator + currentValue);

    expect([1, 2, 3].reduce(f)).toBe(6);
  });

  it('should pass previous element, current element, index, array', () => {
    const f
      = jest.fn((accumulator, currentValue) => accumulator + currentValue);

    [1, 2, 3].reduce(f, 0);

    expect(f).toHaveBeenCalledWith(0, 1, 0, [1, 2, 3]);
    expect(f).toHaveBeenNthCalledWith(2, 1, 2, 1, [1, 2, 3]);
    expect(f.mock.calls[2]).toEqual([3, 3, 2, [1, 2, 3]]);
  });
});
