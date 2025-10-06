'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should sum numbers with initial value', () => {
    const array = [10, 15, 20];

    const result = array.reduce2((acc, cur) => acc + cur, 10);

    expect(result).toBe(55);
  });

  it('should sum numbers without initial value', () => {
    const array = [10, 15, 20];

    const result = array.reduce2((acc, cur) => acc + cur);

    expect(result).toBe(45);
  });

  it('should add values different from integer', () => {
    const array = ['Hello', ' ', 'world!!!'];

    const result = array.reduce2((arr, cur) => arr + cur, '');

    expect(result).toBe('Hello world!!!');
  });

  it('should pass index or array to callback as arguements', () => {
    const array = [3, 5, 7];

    const mockFn = jest.fn((acc, curr) => acc + curr);

    array.reduce2(mockFn);

    expect(mockFn.mock.calls.length).toBe(2);

    expect(mockFn).toHaveBeenCalledWith(3, 5, 1, array);
    expect(mockFn).toHaveBeenCalledWith(8, 7, 2, array);
  });

  it(`should return error,
     if array is empty and is lack of initial value`, () => {
    expect(() => [].reduce2((a, c) =>
      a + c)).toThrow('Array can not be empty.');
  });

  it(`should handle array with element without initial value`, () => {
    const array = [10];

    const result = array.reduce2((arr, curr) => arr + curr);

    expect(result).toBe(10);
  });

  it(`should throw error, if callback is not a function`, () => {
    const array = [11, 22, 33];

    expect(() => array.reduce2(null)).toThrow(TypeError);
    expect(() => array.reduce2('function')).toThrow(TypeError);
    expect(() => array.reduce2({})).toThrow(TypeError);
    expect(() => array.reduce2(100)).toThrow(TypeError);
  });

  it(`should sum array with empty slots`, () => {
    // eslint-disable-next-line no-sparse-arrays
    const array = [1, , 5];

    const result = array.reduce2((arr, curr) =>
      arr + (curr !== undefined && curr !== null ? curr : 0), 0);

    expect(result).toBe(6);
  });
});
