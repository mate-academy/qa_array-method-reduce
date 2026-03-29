'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should be declared', () => {
    expect(Array.prototype.reduce2).toBeInstanceOf(Function);
  });

  it('should sum array with initial value', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const callback = jest.fn((prev, x) => prev + x);

    const result = array.reduce2(callback, 0);

    expect(result).toBe(21);
    expect(callback).toHaveBeenCalledTimes(6);
  });

  it('should sum array without initial value', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const callback = jest.fn((prev, x) => prev + x);

    const result = array.reduce2(callback);

    expect(result).toBe(21);
    expect(callback).toHaveBeenCalledTimes(5);
  });

  it('should return initial value for empty array', () => {
    const array = [];

    const callback = jest.fn((prev, x) => prev + x);

    const result = array.reduce2(callback, 0);

    expect(result).toBe(0);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should return undefined for empty array without initial value', () => {
    const array = [];

    const callback = jest.fn((prev, x) => prev + x);

    const result = () => array.reduce(callback);

    expect(result).toThrow();
  });

  it('should work with single element and initial value', () => {
    const array = [1];

    const callback = jest.fn((prev, x) => prev + x);

    const result = array.reduce2(callback, 2);

    expect(result).toBe(3);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should return element if single element and no initial value', () => {
    const array = [1];

    const callback = jest.fn((prev, x) => prev + x);

    const result = array.reduce2(callback);

    expect(result).toBe(1);
    expect(callback).not.toHaveBeenCalled();
  });
});
