'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should add all numbers in the array', () => {
    const numbers = [1, 2, 3, 4];
    const result = numbers.reduce2((acc, curr) => acc + curr, 0);

    expect(result).toBe(10);
  });

  it('should multiply all numbers in the array', () => {
    const numbers = [2, 3, 4];
    const result = numbers.reduce2((acc, curr) => acc * curr, 1);

    expect(result).toBe(24);
  });

  it('should concatenate all strings in the array', () => {
    const strings = ['Hello', ' ', 'World'];
    const result = strings.reduce2((acc, curr) => acc + curr, '');

    expect(result).toBe('Hello World');
  });

  it('should return the initial value for an empty array', () => {
    const result = [].reduce2(() => {}, 100);

    expect(result).toBe(100);
  });

  it('should return the first element if no initial value is given', () => {
    const numbers = [5];
    const result = numbers.reduce2((acc, curr) => acc + curr);

    expect(result).toBe(5);
  });
});
