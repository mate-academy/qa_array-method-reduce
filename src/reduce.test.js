'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should be a function', () => {
    expect([].reduce2).toBeInstanceOf(Function);
  });

  it('should throw an error if cb is not a func or not passed', () => {
    // eslint-disable-next-line no-undef
    expect(() => [].reduce2(_, 2)).toThrow();
    expect(() => [].reduce2(null, 2)).toThrow();
    expect(() => [].reduce2(undefined, 2)).toThrow();
    expect(() => [].reduce2({}, 2)).toThrow();
    expect(() => [].reduce2([], 2)).toThrow();
    expect(() => [].reduce2(1, 2)).toThrow();
    expect(() => [].reduce2(NaN, 2)).toThrow();
    expect(() => [].reduce2()).toThrow();
  });

  it('should use array first el if initValue is not passed '
    + `and start iteration from second element`, () => {
    const cb = jest.fn();

    [10, 2].reduce2(cb);

    expect(cb).toHaveBeenCalledWith(10, 2, 1, [10, 2]);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should use initValue if it is passed '
    + `and start iteration from first element`, () => {
    const cb = jest.fn();

    [10, 2].reduce2(cb, 0);

    expect(cb).toHaveBeenNthCalledWith(1, 0, 10, 0, [10, 2]);
    expect(cb).toHaveBeenCalledTimes(2);
  });

  it('should throw an error '
    + `if array is empty and initValue is not passed`, () => {
    expect(() => [].reduce2(jest.fn())).toThrow();
  });

  it(`should correctly return counted accumulator`, () => {
    expect([1, 2, 3, 4, 5].reduce2((acc, cur) => acc + cur, 0)).toBe(15);
  });

  it('should return provided initValue if array is empty'
    + ` or return solo value of arr if initV not passed & not call cb`, () => {
    const cb = jest.fn();

    expect([1].reduce2(cb)).toBe(1);
    expect([].reduce2(cb, 1)).toBe(1);
    expect(cb).toHaveBeenCalledTimes(0);
  });
});
