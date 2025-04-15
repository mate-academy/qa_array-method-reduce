'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should sum numbers in an array', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.reduce2((acc, curr) => acc + curr, 0);

    expect(result).toBe(10);
  });

  it('should work without initial value', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.reduce2((acc, curr) => acc + curr);

    expect(result).toBe(10);
  });

  it('should handle empty array with initial value', () => {
    const arr = [];
    const result = arr.reduce2((acc, curr) => acc + curr, 10);

    expect(result).toBe(10);
  });

  it('should concatenate strings in an array', () => {
    const arr = ['Hello', ' ', 'World'];
    const result = arr.reduce2((acc, curr) => acc + curr, '');

    expect(result).toBe('Hello World');
  });

  it('should handle an array of objects and sum values', () => {
    const arr = [{ x: 1 }, { x: 2 }, { x: 3 }];
    const result = arr.reduce2((acc, curr) => acc + curr.x, 0);

    expect(result).toBe(6);
  });

  it('should multiply numbers in an array', () => {
    const arr = [2, 3, 4];
    const result = arr.reduce2((acc, curr) => acc * curr, 1);

    expect(result).toBe(24);
  });

  it('should return single element without initial value', () => {
    expect([42].reduce2((a, b) => a + b)).toBe(42);
  });
});
