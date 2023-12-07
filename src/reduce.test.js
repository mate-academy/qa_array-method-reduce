'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should call a callback once per item'
    + 'if pass the initial value', () => {
    const item = [1, 2, 3];
    const f = jest.fn();

    item.reduce(f, 0);
    expect(f.mock.calls.length).toBe(3);
  });

  it('should call a callback 1 time less than length of array'
    + 'if not pass the initial value', () => {
    const item = [1, 2, 3];
    const f = jest.fn();

    item.reduce(f);
    expect(f).toHaveBeenCalledTimes(2);
  });

  it('should not call a callback if array empty', () => {
    const f = jest.fn();

    [].reduce(f, 0);

    expect(f).not.toHaveBeenCalled();
  });

  it('should if the initial value is not passed, then '
  + 'the first value of the array will be used', () => {
    const item = [1, 2, 3];
    const f = jest.fn();

    item.reduce(f);
    expect(f).toHaveBeenNthCalledWith(1, 1, 2, 1, [1, 2, 3]);
  });

  it('should use the initial value if passed', () => {
    const item = [1, 2, 3];
    const f = jest.fn();

    item.reduce(f, 0);
    expect(f).toHaveBeenNthCalledWith(1, 0, 1, 0, [1, 2, 3]);
  });
});
