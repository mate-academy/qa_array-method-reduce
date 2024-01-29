'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should not call default reduce', () => {
    expect([].reduce2.toString().includes('.reduce('))
      .toBe(false);
  });

  it('should return `startValue` for []', () => {
    const result = [].reduce2((sum, x) => sum + x, 123);

    expect(result).toBe(123);
  });

  it('should not change the original array', () => {
    const values = [10, 20, 30, 40];

    values.reduce2((sum, x) => sum + x, 10);

    expect(values).toEqual([10, 20, 30, 40]);
  });

  it('should sum numbers with number as a start value', () => {
    const result = [1, 2, 3, 4].reduce2((sum, x) => sum + x, 10);

    expect(result).toBe(20);
  });

  it('should concatenate numbers with string as a start value', () => {
    const result = [1, 2, 3, 4, 5, 6].reduce2(
      (sum, x) => sum + x, 'Your salary is '
    );

    expect(result).toBe('Your salary is 123456');
  });

  it('should pass indexes to the callback', () => {
    const result = [1, 2, 3].reduce2((sum, x, i) => sum + i, '');

    expect(result).toBe('012');
  });

  test('should pass the array to the callback', () => {
    const values = [1, 2, 3];
    const result = values.reduce2(
      (sum, x, i, arr) => arr === values ? sum + 1 : 0,
      0,
    );

    expect(result).toBe(3);
  });

  it('should work with arrays of objects', () => {
    const values = [
      {
        name: 'John', age: 20,
      },
      {
        name: 'Alice', age: 15,
      },
      {
        name: 'Ann', age: 35,
      },
    ];

    const result = values.reduce2(
      (acc, current) => acc + current.age, 0
    );

    expect(result).toEqual(70);
  });

  it('should return the start value if'
  + 'the array is empty and no start value is provided', () => {
    const result = [].reduce2((acc, current) => acc + current);

    expect(result).toEqual(undefined);
  });
});
