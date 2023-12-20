'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('declared', () => {
    expect(Array.prototype.reduce2).toBeInstanceOf(Function);
  });

  it('simple array and accumulator', () => {
    const array = [1, 2, 3, 4, 5];
    const result = array.reduce2((acc, el) => {
      return acc + el;
    }, 0);

    expect(result).toBe(15);
  });

  it('empty array', () => {
    const array = [];
    const result = array.reduce2((acc, el) => {
      return acc + el;
    }, 0);

    expect(result).toBe(0);
  });

  it('works with an initialValue > 0 correctly', () => {
    const array = [1, 2, 3];

    const result = array.reduce2((acc, el) => {
      return acc + el;
    }, 10);

    expect(result).toBe(16);
  });

  it('works correctly with an object accumulator', () => {
    const array = [1, 2, 3, 4, 5];

    const result = array.reduce2(
      (acc, el) => {
        return { sum: acc.sum + el };
      },
      { sum: 0 }
    );

    expect(result).toStrictEqual({ sum: 15 });
  });

  it('concatenates strings', () => {
    const array = ['d', 'e', 'f', 'g'];

    const result = array.reduce2((acc, el) => {
      return acc + el;
    }, 'abc');

    expect(result).toBe('abcdefg');
  });

  it("doesn't mutate original array", () => {
    const array = [1, 2, 3, 4, 5];

    array.reduce2((acc, el) => {
      return acc + el;
    }, 0);

    expect(array).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it('should reduce w/o start value', () => {
    const array = [1, 2, 3, 4, 5];

    const result = array.reduce2((acc, el) => {
      return acc + el;
    });

    expect(result).toBe(15);
  });
});
