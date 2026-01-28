'use strict';

const { reduce } = require('./reduce');

describe('custom reduce', () => {
  const callReduce = (arr, ...args) =>
    reduce.call(arr, ...args);

  test('reduces with an initial value', () => {
    const arr = [1, 2, 3];
    const result = callReduce(arr, (acc, v) => acc + v, 0);

    expect(result).toBe(6);
  });

  test('reduces without an initial value', () => {
    const arr = [1, 2, 3];
    const result = callReduce(arr, (acc, v) => acc + v);

    expect(result).toBe(6);
  });

  test('uses first element as initial accumulator when none provided', () => {
    const arr = [5, 10, 15];
    const result = callReduce(arr, (acc, v) => acc + v);

    expect(result).toBe(30);
  });

  test('throws TypeError when callback is not a function', () => {
    const arr = [1, 2, 3];

    expect(() => callReduce(arr, null, 0)).toThrow(TypeError);
  });

  test('throws TypeError on empty array without initial value', () => {
    expect(() => callReduce([], (a, b) => a + b)).toThrow(TypeError);
  });

  test('passes correct arguments to callback', () => {
    const arr = [10, 20, 30];
    const mock = jest.fn((acc, v) => acc + v);

    callReduce(arr, mock, 0);

    expect(mock).toHaveBeenCalledTimes(3);
    expect(mock.mock.calls[0]).toEqual([0, 10, 0, arr]);
    expect(mock.mock.calls[1]).toEqual([10, 20, 1, arr]);
    expect(mock.mock.calls[2]).toEqual([30, 30, 2, arr]);
  });

  test('works with objects', () => {
    const arr = [{ x: 1 }, { x: 2 }, { x: 3 }];
    const result = callReduce(arr, (acc, obj) => acc + obj.x, 0);

    expect(result).toBe(6);
  });

  test('skips empty slots in a sparse array', () => {
  // eslint-disable-next-line no-sparse-arrays
    const arr = [1, , 3]; // A sparse array
    const callback = jest.fn((sum, el) => sum + el);
    const result = callReduce(arr, callback, 0);

    expect(callback).toHaveBeenCalledTimes(2); // Only indices 0 and 2 exist
    expect(result).toBe(4); // 0 + 1 + 3
  });

  test('single-element arr without initial value returns that element', () => {
    const arr = [42];
    const result = callReduce(arr, (acc, v) => acc + v);

    expect(result).toBe(42);
  });

  test('single-element array with initial value applies callback once', () => {
    const arr = [42];
    const result = callReduce(arr, (acc, v) => acc + v, 10);

    expect(result).toBe(52);
  });
});
