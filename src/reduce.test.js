'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should sum all numbers with a start value', () => {
    const numbers = [1, 2, 3, 4];

    const result = numbers.reduce2((sum, number) => sum + number, 0);

    expect(result).toBe(10);
  });

  it('should sum all numbers without a start value', () => {
    const numbers = [1, 2, 3, 4];

    const result = numbers.reduce2((sum, number) => sum + number);

    expect(result).toBe(10);
  });

  it('should use the start value as the first accumulator value', () => {
    const numbers = [1, 2, 3];

    const result = numbers.reduce2((sum, number) => sum + number, 10);

    expect(result).toBe(16);
  });

  it('should concatenate strings', () => {
    const words = ['Hello', ' ', 'World'];

    const result = words.reduce2((sentence, word) => sentence + word, '');

    expect(result).toBe('Hello World');
  });

  it('should pass accumulator and current value to the callback', () => {
    const callback = jest.fn((accumulator, currentValue) => {
      return accumulator + currentValue;
    });

    [1, 2, 3].reduce2(callback, 0);

    expect(callback).toHaveBeenNthCalledWith(1, 0, 1, 0, [1, 2, 3]);
    expect(callback).toHaveBeenNthCalledWith(2, 1, 2, 1, [1, 2, 3]);
    expect(callback).toHaveBeenNthCalledWith(3, 3, 3, 2, [1, 2, 3]);
  });

  it('should pass the current index to the callback', () => {
    const indexes = [];

    [10, 20, 30].reduce2((accumulator, value, index) => {
      indexes.push(index);

      return accumulator + value;
    }, 0);

    expect(indexes).toEqual([0, 1, 2]);
  });

  it('should pass the original array to the callback', () => {
    const numbers = [1, 2, 3];

    numbers.reduce2((accumulator, value, index, array) => {
      expect(array).toBe(numbers);

      return accumulator + value;
    }, 0);
  });

  it('should not change the original array', () => {
    const numbers = [1, 2, 3];
    const originalNumbers = [...numbers];

    numbers.reduce2((sum, number) => sum + number, 0);

    expect(numbers).toEqual(originalNumbers);
  });

  it('should call callback 1 time less without start value', () => {
    const callback = jest.fn((sum, number) => sum + number);

    [1, 2, 3].reduce2(callback);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should return start value for an empty array', () => {
    const result = [].reduce2((sum, number) => sum + number, 10);

    expect(result).toBe(10);
  });

  it('should build an object from array values', () => {
    const fruits = ['apple', 'banana'];

    const result = fruits.reduce2((object, fruit, index) => {
      object[index] = fruit;

      return object;
    }, {});

    expect(result).toEqual({
      0: 'apple',
      1: 'banana',
    });
  });
});
