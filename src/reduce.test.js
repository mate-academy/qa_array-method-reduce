'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should reduce an array to a single value', () => {
    const array = [1, 2, 3, 4, 5];
    const sum = array.reduce2((acc, curr) => acc + curr);

    expect(sum).toBe(15);
  });

  it('should reduce an array starting from a specified initial value', () => {
    const array = [1, 2, 3, 4, 5];
    const product = array.reduce2((acc, curr) => acc * curr, 1);

    expect(product).toBe(120);
  });

  it('should work with an empty array and no initial value', () => {
    const array = [];
    const result = array.reduce2((acc, curr) => acc + curr);

    expect(result).toBeUndefined();
  });

  it('should throw an error if the callback function is not provided', () => {
    const array = [1, 2, 3, 4, 5];

    expect(() => array.reduce2()).toThrowError(TypeError);
  });

  it('should iterate over array elements in the correct order', () => {
    const array = ['a', 'b', 'c', 'd'];
    const result = array.reduce2((acc, curr) => acc + curr);

    expect(result).toBe('abcd');
  });

  it('should modify the startValue if the callback function modifies it',
    () => {
      const array = [1, 2, 3, 4, 5];
      const startValue = { value: 0 };

      array.reduce2((acc, curr) => {
        acc.value += curr;

        return acc;
      }, startValue);
      expect(startValue.value).toBe(15);
    });

  it('should return the single element of the array if it has only one element',
    () => {
      const array = [42];
      const result = array.reduce2((acc, curr) => acc + curr);

      expect(result).toBe(42);
    });

  it('should reduce an array of objects to a single value', () => {
    const array = [{ value: 1 }, { value: 2 }, { value: 3 }];
    const sum = array.reduce2((acc, curr) => acc + curr.value, 0);

    expect(sum).toBe(6);
  });
});
