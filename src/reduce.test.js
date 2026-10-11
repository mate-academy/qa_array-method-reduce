'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should sum elements with an initial value', () => {
    const numbers = [1, 2, 3, 4, 5];
    const f = jest.fn((acc, curr) => acc + curr);
    const result = numbers.reduce2(f, 0);

    expect(result).toBe(15);
    expect(f).toHaveBeenCalledTimes(5);
  });

  it('should sum elements without an initial value', () => {
    const numbers = [1, 2, 3, 4, 5];
    const f = jest.fn((acc, curr) => acc + curr);
    const result = numbers.reduce2(f);

    expect(result).toBe(15);
    expect(f).toHaveBeenCalledTimes(4);
  });

  it('should pass correct arguments to the callback', () => {
    const arr = [10, 20];
    const iterations = [];

    arr.reduce2((acc, curr, index, sourceArray) => {
      iterations.push({
        acc,
        curr,
        index,
        sourceArray,
      });

      return acc + curr;
    }, 0);

    expect(iterations).toEqual([
      {
        acc: 0,
        curr: 10,
        index: 0,
        sourceArray: arr,
      },
      {
        acc: 10,
        curr: 20,
        index: 1,
        sourceArray: arr,
      },
    ]);
  });

  it('should return initial value if the array is empty', () => {
    const f = jest.fn((acc, curr) => acc + curr);
    const result = [].reduce2(f, 42);

    expect(result).toBe(42);
    expect(f).not.toHaveBeenCalled();
  });

  it('should throw a TypeError if the array is empty', () => {
    const f = jest.fn((acc, curr) => acc + curr);

    expect(() => {
      [].reduce2(f);
    }).toThrow(TypeError);
  });

  it('should return the only element without calling callback', () => {
    const f = jest.fn((acc, curr) => acc + curr);
    const result = [99].reduce2(f);

    expect(result).toBe(99);
    expect(f).not.toHaveBeenCalled();
  });

  it('should transform an array into an object map', () => {
    const fruits = ['apple', 'banana', 'apple'];
    const result = fruits.reduce2((acc, fruit) => {
      acc[fruit] = (acc[fruit] || 0) + 1;

      return acc;
    }, {});

    expect(result).toEqual({ apple: 2, banana: 1 });
  });
  // Add tests here
});
