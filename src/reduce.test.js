'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  let reducer;

  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
    reducer = jest.fn((acc, curr) => acc + curr);
  });

  beforeEach(() => {
    reducer = jest.fn((acc, curr) => acc + curr);
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should call a callback once per item', () => {
    const arr = [1, 2, 3, 4, 5];
    const initialValue = 0;

    arr.reduce2(reducer, initialValue);
    expect(reducer).toHaveBeenCalledTimes(arr.length);
  });

  it('should return the start value when the array is empty', () => {
    const arr = [];
    const initialValue = 0;

    expect(arr.reduce2(reducer, initialValue)).toEqual(initialValue);
  });

  it('should reduce the array with the provided start value', () => {
    const arr = [1, 2, 3, 4, 5];
    const initialValue = 3;
    const expectedResult = arr.reduce(reducer, initialValue);

    expect(arr.reduce2(reducer, initialValue)).toEqual(expectedResult);
  });

  it('should reduce the array without start value', () => {
    const arr = [1, 2, 3, 4, 5];
    const expectedResult = arr.reduce(reducer);

    expect(arr.reduce2(reducer)).toEqual(expectedResult);
  });

  it('should call the reducer function with correct arguments', () => {
    const arr = [1, 2, 3, 4, 5];
    const initialValue = 1;

    arr.reduce2(reducer, initialValue);
    expect(reducer).toHaveBeenCalledTimes(arr.length);

    arr.forEach((element, index) => {
      expect(reducer).toHaveBeenCalledWith(
        expect.any(Number),
        element,
        index,
        arr);
    });
  });
});
