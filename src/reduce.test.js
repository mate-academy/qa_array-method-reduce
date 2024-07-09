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

  it('should work correct without start value', () => {
    const result = [1, 2, 3, 4, 5].reduce2((sum, elem) => sum + elem);

    expect(result).toBe(15);
  });

  it('should work correct with random initial value', () => {
    const result = [1, 2, 3, 4, 5].reduce2((sum, elem) => sum + elem, 10);

    expect(result).toBe(25);
  });

  it('should be invoked only 3 times', () => {
    const cb = jest.fn((sum, elem, i) => {
      if (i > 2) {
        return sum;
      }

      return sum + elem;
    });

    const result = [1, 2, 3, 4, 5].reduce2(cb, 0);

    expect(result).toEqual(6);
  });

  it('array should not change', () => {
    const arr = [1, 2, 3, 4, 5];

    const cb = jest
      .fn((sum, elem, i) => {
        if (i > 2) {
          return sum;
        }

        return sum + elem;
      })
      .mockReturnValueOnce(true);

    arr.reduce2(cb);

    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  it('third and fourth parameters should be reachable', () => {
    const arr = [1, 2, 3, 4, 5];

    const cb = (sum, elem, i, self) => {
      return sum + self[i];
    };

    const result = arr.reduce2(cb);

    expect(result).toEqual(15);
  });
});
