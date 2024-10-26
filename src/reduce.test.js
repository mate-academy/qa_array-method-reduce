'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it(`should return error if callback doesn't passed`, () => {
    expect(() => {
      [1, 2, 3].reduce2();
    }).toThrow();
  });

  it('should work with undefined passed as an initial value', () => {
    const callback = (a, b) => a + b;

    expect([1, 2, 3].reduce2(callback, undefined)).toBe(NaN);
    expect(['1', '2', '3'].reduce2(callback, undefined)).toBe('undefined123');
  });

  it('should correctly work without initial value', () => {
    const callback = (a, b) => a + b;

    expect([1, 2, 3].reduce2(callback)).toBe(6);
    expect(['13', '2444', '33'].reduce2(callback)).toBe('13244433');
  });

  it('should return initial value for empty array', () => {
    expect([].reduce2(() => {}, 123)).toBe(123);
  });

  it('should pass indexes to the callback', () => {
    const callback = (acc, el, i) => acc - i;

    expect(['a', 'b', 'cvc'].reduce2(callback, 100)).toBe(97);
  });

  it('should pass the array to the callback', () => {
    const callback = (acc, el, i, arr) => acc > arr[i].length
      ? acc
      : arr[i].length;

    expect(['sdsd', 'ssd', 'sdsdsdsd'].reduce2(callback, 0)).toBe(8);
  });
});
