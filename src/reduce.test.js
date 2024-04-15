'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it(`should be declared`, () => {
    expect(Array.prototype.reduce2)
      .toBeInstanceOf(Function);
  });

  it('should reduce an array of numbers to their sum', () => {
    const arr = [1, 2, 3, 4, 5];

    const sum = arr.reduce2(
      (acc, curr) => acc + curr, 0);

    expect(sum).toBe(15);
  });

  it('should reduce an array of strings to their concatenated form', () => {
    const arr = ['Hello', ' ', 'world', '!'];

    const result = arr.reduce2(
      (acc, curr) => acc + curr, '');

    expect(result).toBe('Hello world!');
  });

  it('should reduce an array to find the maximum value', () => {
    const arr = [5, 10, 2, 8, 3];

    const max = arr.reduce2(
      (acc, curr) => Math.max(acc, curr), arr[0]);

    expect(max).toBe(10);
  });

  it('should handle an empty array', () => {
    const arr = [];

    const result = arr.reduce2(
      (acc, curr) => acc + curr, '');

    expect(result).toBe('');
  });

  it('should handle an array with one element', () => {
    const arr = [5];

    const result = arr.reduce2(
      (acc, curr) => acc + curr, 0);

    expect(result).toBe(5);
  });

  it('should handle an array without startValue', () => {
    const arr = [1, 2, 3, 4, 5];

    const sum = arr.reduce2(
      (acc, curr) => acc + curr);

    const product = arr.reduce2(
      (acc, curr) => acc * curr);

    expect(sum).toBe(15);
    expect(product).toBe(120);
  });
});
