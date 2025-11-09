'use strict';

const { reduce } = require('./reduce');
const arr = [0, 1, 2, 3, 4];
const sumCb = (acc, current, i, array) => acc + current;

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should return a number', () => {
    expect(typeof arr.reduce2(sumCb, 0)).toBe('number');
  });

  it('should return an accumulated value', () => {
    expect(arr.reduce2(sumCb, 0)).toBe(10);
  });

  it('should return an initial value if array is empty', () => {
    expect([].reduce2(sumCb, 0)).toBe(0);
  });

  it('should call cb for every item', () => {
    const cb = jest.fn();

    arr.reduce2(cb, 0);
    expect(cb).toHaveBeenCalledTimes(5);
  });

  it('should call cb with all params', () => {
    const cb = jest.fn(sumCb);

    arr.reduce2(cb, 0);

    expect(cb).nthCalledWith(1, 0, 0, 0, arr);
    expect(cb).nthCalledWith(2, 0, 1, 1, arr);
    expect(cb).nthCalledWith(3, 1, 2, 2, arr);
    expect(cb).nthCalledWith(4, 3, 3, 3, arr);
    expect(cb).nthCalledWith(5, 6, 4, 4, arr);
  });

  it('should use first element as accumulator if it is not provided', () => {
    const cb = jest.fn();

    arr.reduce2(cb);
    expect(cb).nthCalledWith(1, arr[0], arr[1], 1, arr);
  });

  it('throws TypeError if array and initial value are empty', () => {
    expect(() => [].reduce2(sumCb)).toThrow(TypeError);
  });

  it("doesn't call cb for [1] without init", () => {
    const cb = jest.fn();

    [1].reduce2(cb);

    expect(cb).not.toHaveBeenCalled();
  });
});
