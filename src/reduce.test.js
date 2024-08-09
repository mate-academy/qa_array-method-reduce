'use strict';

const { reduce } = require('./reduce');

describe('reduce2', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('is declared', () => {
    expect(reduce).toBeInstanceOf(Function);
  });

  it('sums numbers without start value', () => {
    const result = [1, 2, 3, 4, 5].reduce2((sum, elem) => sum + elem);

    expect(result).toBe(15);
  });

  it('sums numbers with initial value', () => {
    const result = [1, 2, 3, 4, 5].reduce2((sum, elem) => sum + elem, 10);

    expect(result).toBe(25);
  });

  it('invokes callback only 3 times', () => {
    const cb = jest.fn((sum, elem, i) => {
      if (i > 2) {
        return sum;
      }

      return sum + elem;
    });

    const result = [1, 2, 3, 4, 5].reduce2(cb, 0);

    expect(result).toEqual(6);
  });

  it('does not modify the original array.', () => {
    const arr = [1, 2, 3, 4, 5];
    const cb = jest.fn((sum, elem, i) => sum + elem);

    arr.reduce2(cb);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  it('uses array and index parameters', () => {
    const arr = [1, 2, 3, 4, 5];
    const cb = (sum, elem, i, self) => sum + self[i];
    const result = arr.reduce2(cb);

    expect(result).toEqual(15);
  });

  it('concatenates strings', () => {
    const result = ['a', 'b', 'c'].reduce2((concat, elem) => concat + elem, '');

    expect(result).toBe('abc');
  });

  it('handles empty array with start value.', () => {
    const result = [].reduce2((sum, elem) => sum + elem, 0);

    expect(result).toBe(0);
  });
});
