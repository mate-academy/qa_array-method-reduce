'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should be declarated', () => {
    expect(reduce).toBeDefined();
  });

  it('should return correct value '
  + 'when callback and initial value are provided', () => {
    const numbers = [1, 100, 500];
    const getMax = (a, b) => Math.max(a, b);

    const result = numbers.reduce(getMax, 10);

    expect(result).toBe(500);
  });

  it('should return correct value '
  + 'when callback and initial value are provided', () => {
    const numbers = [1, 100, 500];
    const getMax = (a, b) => Math.max(a, b);

    const result = numbers.reduce(getMax, 10);

    expect(result).toBe(500);
  });

  it('should return correct value after callback '
  + 'when initial value is not provided', () => {
    const numbers = [1, 10, 20];
    const sum = (a, b) => a + b;

    const result = numbers.reduce(sum);

    expect(result).toBe(31);
  });

  it('should combine array of strings into one string', () => {
    const words = ['task', ' ', 'is', ' ', 'done'];
    const sum = (a, b) => a + b;

    const result = words.reduce(sum);

    expect(result).toBe('task is done');
  });
});
