'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  const arr = [1, 2, 3, 4, 5];
  let callback;

  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  beforeEach(() => {
    callback = jest.fn((prev, current) => prev + current);
  });

  it('should be declared', () => {
    expect(reduce)
      .toBeInstanceOf(Function);
  });

  it('should run callback for every element in array', function() {
    arr.reduce2(callback, 0);

    expect(callback)
      .toHaveBeenCalledTimes(arr.length);
  });

  it('should run callback (arr.length - 1) times'
    + 'if initial value is not passed', function() {
    arr.reduce2(callback);

    expect(callback)
      .toHaveBeenCalledTimes(arr.length - 1);
  });

  it('should return result of last callback call', function() {
    const result = arr.reduce2(callback, 0);

    expect(result)
      .toBe(15);
  });

  it('should not run callback if array is empty', function() {
    [].reduce2(callback);

    expect(callback)
      .not.toHaveBeenCalled();
  });

  it('should not mutate existing array', function() {
    const testArr = [1, 2, 3];

    testArr.reduce2(callback, 0);

    expect(testArr)
      .toEqual([1, 2, 3]);
  });

  it('should run callback for every element'
    + 'with correct arguments', function() {
    arr.reduce2(callback, 0);

    expect(callback)
      .toHaveBeenNthCalledWith(1, 0, 1, 0, arr);

    expect(callback)
      .toHaveBeenNthCalledWith(2, 1, 2, 1, arr);

    expect(callback)
      .toHaveBeenNthCalledWith(3, 3, 3, 2, arr);

    expect(callback)
      .toHaveBeenNthCalledWith(4, 6, 4, 3, arr);

    expect(callback)
      .toHaveBeenNthCalledWith(5, 10, 5, 4, arr);
  });

  it(`should return a solo value and don't run a callback`
    + `if array has only one element`
    + `and initial value is not passed`, function() {
    const result = [2].reduce2(callback);

    expect(result)
      .toBe(2);

    expect(callback)
      .not.toHaveBeenCalled();
  });

  it(`should return a solo value and don't run a callback`
    + `if initial value is passed but array is empty`, function() {
    const result = [].reduce2(callback, 0);

    expect(result)
      .toBe(0);

    expect(callback)
      .not.toHaveBeenCalled();
  });
});
