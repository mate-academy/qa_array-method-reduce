'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should combine all letters into a string', () => {
    const func = jest.fn()
      .mockImplementation((prev, current) => {
        return prev + current;
    });

    const letters = ['h', 'e', 'l', 'l', 'o'];

    const result = letters.reduce2(func, '');

    expect(result).toBe('hello');
    expect(func).toHaveBeenCalledTimes(5);
    expect(func).not.toBeUndefined();
    expect(func.mock.calls[2]).toEqual(['he', 'l', 2, letters]);
  });

  it('should sum all numbers', () => {
    const func = jest.fn()
      .mockImplementation((prev, current) => {
        return prev + current;
    });

    const numbers = [1, 2, 3, 4, 5];

    const result = numbers.reduce2(func, 0);

    expect(result).toBe(15);
    expect(func).toHaveBeenCalledTimes(5);
    expect(func).not.toBeUndefined();
    expect(func.mock.calls[2]).toEqual([3, 3, 2, numbers]);
  });
});
