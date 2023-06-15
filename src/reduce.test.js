'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should calculate the sum of array elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const sum = arr.reduce2((acc, curr) => acc + curr, 0);

    expect(sum).toBe(15);
  });

  it('should combine array elements into a string', () => {
    const arr = ['Hello', ' ', 'world', '!'];
    const str = arr.reduce2((acc, curr) => acc + curr, '');

    expect(str).toBe('Hello world!');
  });

  it('should find max element of the array', () => {
    const arr = [10, 5, 8, 3, 12];
    const max = arr.reduce2((acc, curr) => (curr > acc ? curr : acc));

    expect(max).toBe(12);
  });

  it('should count average value of the array', () => {
    const arr = [2, 4, 6, 8, 10];
    const avg = arr.reduce2((acc, curr, index, array) => {
      const total = acc + curr;

      if (index === array.length - 1) {
        return total / array.length;
      } else {
        return total;
      }
    }, 0);

    expect(avg).toBe(6);
  });
});
