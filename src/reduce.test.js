'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  let cb;

  beforeEach(() => {
    cb = jest.fn((accum, curr, i, array) => accum + curr);
  });

  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should start from 0 index when no initial value is provided', () => {
    const items = ['first', 'second', 'third'];

    items.reduce2(cb);

    expect(cb).toHaveBeenNthCalledWith(1, 'first', 'second', 1, items);
  });

  it('should use the provided initial value as a start point', () => {
    const items = ['first', 'second', 'third'];

    items.reduce2(cb, 'start');

    expect(cb).toHaveBeenNthCalledWith(1, 'start', 'first', 0, items);
  });

  it('should return the initial value if an array is empty', () => {
    const result = [].reduce2(cb, 'start');

    expect(result).toBe('start');
  });

  it('should pass correct arguments to the cb during each iteration', () => {
    const items = [1, 2, 3];

    items.reduce2(cb, 0);

    expect(cb).toHaveBeenNthCalledWith(1, 0, 1, 0, items);
    expect(cb).toHaveBeenNthCalledWith(2, 1, 2, 1, items);
    expect(cb).toHaveBeenNthCalledWith(3, 3, 3, 2, items);
  });

  it('should accumulate the result from previous calls of cb', () => {
    const items = [1, 2, 3];

    const result = items.reduce2(cb, 0);

    expect(result).toBe(6);
  });

  it('should use the initial value and run the cb'
    + 'for a single-element array', () => {
    const result = [5].reduce2(cb, 10);

    expect(result).toBe(15);
  });

  it('should return the only element when no initial value is provided', () => {
    const result = [5].reduce2(cb);

    expect(result).toBe(5);
  });
});
