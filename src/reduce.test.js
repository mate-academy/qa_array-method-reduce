'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  const array = [2, 4, 6, 8];
  const callback1 = jest.fn((prev, x) => prev + x);
  const callback2 = jest.fn((prev, x) => prev - x);

  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should be declared', () => {
    expect(array.reduce2)
      .toBeInstanceOf(Function);
  });

  it('should return correct value', () => {
    expect(array.reduce2(callback1, 10))
      .toBe(30);

    expect(array.reduce2(callback2, 40))
      .toBe(20);
  });

  it('should be called for every element of array', () => {
    array.reduce2(callback1, 10);

    expect(callback1).toBeCalledWith(10, 2, 0, array);
    expect(callback1).toBeCalledWith(12, 4, 1, array);
    expect(callback1).toBeCalledWith(16, 6, 2, array);
    expect(callback1).toBeCalledWith(22, 8, 3, array);
  });

  it('should correct work without start value', () => {
    expect(array.reduce2(callback1))
      .toBe(20);

    expect(array.reduce2(callback2))
      .toBe(-16);
  });
});
