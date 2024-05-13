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

  it('if an array is empty, returns the initial value', () => {
    const result = [].reduce2(() => {}, 0);

    expect(result).toBe(0);
  });

  it('No initial value was provided', () => {
    const result = [1, 3, 3].reduce2((prev, current) => prev + current);

    expect(result).toBe(7);
  });

  it('Works properly with the initial value', () => {
    const cb = (prev, current) => prev + current;
    const result = [1, 3, 3].reduce2(cb, 10);

    expect(result).toBe(17);
  });

  it('callback can do different actions', () => {
    const cb = (prev, current) => (prev * current) + 1;
    const result = [1, 3, 3].reduce2(cb, 10);

    expect(result).toBe(103);
  });

  it('an array with only 1 element and initial value', () => {
    const cb = (prev, current) => prev + current;
    const result = [1].reduce2(cb, 10);

    expect(result).toBe(11);
  });

  it('an array with only 1 element and no initial value', () => {
    const cb = (prev, current) => prev + current;
    const result = [1].reduce2(cb);

    expect(result).toBe(1);
  });

  it(`a callback is called as many times as there are elements
      if the initial value was provided`, () => {
    const cb = jest.fn((prev, current) => prev + current);

    [1, 2, 3, 4, 5].reduce2(cb, 50);

    expect(cb).toHaveBeenCalledTimes(5);
  });

  it(`a callback is called 1 less time than the array length
      when no initial value was provided`, () => {
    const cb = jest.fn((prev, current) => prev + current);

    [1, 2, 3, 4, 5].reduce2(cb);

    expect(cb).toHaveBeenCalledTimes(4);
  });
});
