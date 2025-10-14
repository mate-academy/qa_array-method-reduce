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
    const result = arr.reduce2((acc, val) => acc + val, 0);
    expect(result).toBe(10);
  });

  it('should multiply numbers in an array', () => {
    const arr = [1, 2, 3, 4];
    const result = arr.reduce2((acc, val) => acc * val, 1);
    expect(result).toBe(24);
  });

  it('should work without initial value', () => {
    const arr = [1, 2, 3];
    const result = arr.reduce2((acc, val) => acc + val);
    expect(result).toBe(6);
  });

  it('should handle empty array with initial value', () => {
    const arr = [];
    const cb = jest.fn();
    const result = arr.reduce2(cb, 5);
    expect(result).toBe(5);
    expect(cb).toHaveBeenCalledTimes(0); // callback nie powinien zostać wywołany
  });

  it('should throw error when empty array and no initial value', () => {
    const arr = [];
    expect(() => arr.reduce2((acc, val) => acc + val))
      .toThrow(TypeError);
  });

  it('should pass correct arguments to callback', () => {
    const arr = [10, 20];
    const mockCb = jest.fn((acc, val, idx, array) => acc + val);
    arr.reduce2(mockCb, 0);

    expect(mockCb).toHaveBeenCalledTimes(2);

    const firstCallArgs = [0, 10, 0, arr];
    const secondCallArgs = [10, 20, 1, arr];

    expect(mockCb).toHaveBeenNthCalledWith(1, ...firstCallArgs);
    expect(mockCb).toHaveBeenNthCalledWith(2, ...secondCallArgs);
  });

  it('should handle sparse array', () => {
    const arr = [1, undefined, 3]; // zamiast dziury używamy undefined
    const cb = jest.fn((acc, val) => acc + (val || 0));
    const result = arr.reduce2(cb, 0);

    expect(result).toBe(4);
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

