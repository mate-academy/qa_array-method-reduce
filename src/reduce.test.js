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
    expect([1, 2, 3, 4].reduce2((acc, cur) => acc + cur, 0)).toBe(10);
  });

  it('should sum numbers without initial value', () => {
    expect([1, 2, 3, 4].reduce2((acc, cur) => acc + cur)).toBe(10);
  });

  it('should return initial value for empty array', () => {
    expect([].reduce2((acc, cur) => acc + cur, 42)).toBe(42);
  });

  it('should throw TypeError for empty array without initial value', () => {
    expect(() => [].reduce2((acc, cur) => acc + cur)).toThrow(TypeError);
  });

  // prettier-ignore
  it('should return sole element, skip callback, when no initial value', () => {
    const cb = jest.fn();
    const result = [7].reduce2(cb);

    expect(result).toBe(7);
    expect(cb).not.toHaveBeenCalled();
  });

  it('should call callback once for single element with initial value', () => {
    const cb = jest.fn((acc, cur) => acc + cur);
    const result = [5].reduce2(cb, 10);

    expect(result).toBe(15);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should pass correct arguments to callback (with initial value)', () => {
    const calls = [];
    const arr = [1, 2, 3];

    arr.reduce2((acc, cur, idx, src) => {
      calls.push({
        acc,
        cur,
        idx,
        src,
      });

      return acc + cur;
    }, 0);

    expect(calls[0]).toEqual({
      acc: 0,
      cur: 1,
      idx: 0,
      src: arr,
    });

    expect(calls[1]).toEqual({
      acc: 1,
      cur: 2,
      idx: 1,
      src: arr,
    });

    expect(calls[2]).toEqual({
      acc: 3,
      cur: 3,
      idx: 2,
      src: arr,
    });
  });

  it('should pass correct arguments to callback (without init value)', () => {
    const calls = [];
    const arr = [10, 20, 30];

    arr.reduce2((acc, cur, idx, src) => {
      calls.push({
        acc,
        cur,
        idx,
        src,
      });

      return acc + cur;
    });

    expect(calls[0]).toEqual({
      acc: 10,
      cur: 20,
      idx: 1,
      src: arr,
    });

    expect(calls[1]).toEqual({
      acc: 30,
      cur: 30,
      idx: 2,
      src: arr,
    });
  });

  it('should work with strings', () => {
    expect(['a', 'b', 'c'].reduce2((acc, cur) => acc + cur, '')).toBe('abc');
  });

  it('should work with objects as accumulator', () => {
    const result = ['foo', 'bar', 'foo'].reduce2((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;

      return acc;
    }, {});

    expect(result).toEqual({ foo: 2, bar: 1 });
  });

  it('should flatten array', () => {
    const result = [[1, 2], [3], [4, 5]].reduce2(
      (acc, cur) => acc.concat(cur),
      [],
    );

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should not mutate original array', () => {
    const arr = [1, 2, 3];

    arr.reduce2((acc, cur) => acc + cur, 0);

    expect(arr).toEqual([1, 2, 3]);
  });
});
