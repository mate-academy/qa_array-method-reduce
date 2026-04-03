'use strict';

const { reduce } = require('./reduce');

describe('Custom reduce method', () => {
  let numbers;

  beforeEach(() => {
    numbers = [1, 2, 3, 4];
  });

  it('should sum all numbers with initial value', () => {
    const result = reduce.call(numbers, (acc, num) => acc + num, 0);

    expect(result).toBe(10);
  });

  it('should sum all numbers without initial value', () => {
    const result = reduce.call(numbers, (acc, num) => acc + num);

    expect(result).toBe(10);
  });

  it('should multiply all numbers', () => {
    const result = reduce.call(numbers, (acc, num) => acc * num, 1);

    expect(result).toBe(24);
  });

  it('should concatenate strings', () => {
    const words = ['Hello', ' ', 'World'];

    const result = reduce.call(words, (acc, word) => acc + word, '');

    expect(result).toBe('Hello World');
  });

  it('should return initial value for empty array', () => {
    const result = reduce.call([], (acc, num) => acc + num, 100);

    expect(result).toBe(100);
  });

  it('should call callback correct number of times', () => {
    const callback = jest.fn((acc, num) => acc + num);

    reduce.call(numbers, callback, 0);

    expect(callback).toHaveBeenCalledTimes(4);
  });

  it('should pass correct arguments to callback', () => {
    const callback = jest.fn((acc, num) => acc + num);

    reduce.call(numbers, callback, 0);

    expect(callback).toHaveBeenNthCalledWith(1, 0, 1, 0, numbers);
    expect(callback).toHaveBeenNthCalledWith(2, 1, 2, 1, numbers);
  });
});
