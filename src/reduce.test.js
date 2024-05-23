'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should should sum all numbers in an array with an initial value', () => {
    const result = [1, 2, 3, 4].reduce2((acc, curr) => acc + curr, 0);

    expect(result).toBe(10);
  });

  it('should sum all numbers in an array without an initial value', () => {
    const result = [1, 2, 3, 4].reduce2((acc, curr) => acc + curr);

    expect(result).toBe(10);
  });

  it('should multiply all numbers in array with an initial value', () => {
    const result = [1, 2, 3, 4].reduce2((acc, curr) => acc * curr, 2);

    expect(result).toBe(48);
  });

  it('should concatenate an array of strings with an initial value', () => {
    const result = ['a', 'b', 'c'].reduce2((acc, curr) => acc + curr, '');

    expect(result).toBe('abc');
  });

  it('should return the initial value if the array is empty', () => {
    const result = [].reduce2((acc, curr) => acc + curr, 10);

    expect(result).toBe(10);
  });

  it('should pass correct parameters to the callback', () => {
    const mockCallback = jest.fn((acc, curr) => acc + curr);

    [1, 2, 3].reduce2(mockCallback, 0);

    expect(mockCallback).toHaveBeenCalledWith(0, 1, 0, [1, 2, 3]);
    expect(mockCallback).toHaveBeenCalledWith(1, 2, 1, [1, 2, 3]);
    expect(mockCallback).toHaveBeenCalledWith(3, 3, 2, [1, 2, 3]);
  });
});
