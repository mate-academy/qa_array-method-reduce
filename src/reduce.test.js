'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should be attached to Array prototype as a function', () => {
    expect([].reduce2).toBeInstanceOf(Function);
  });

  it('should correctly reduce an array when initial value is provided', () => {
    const numbers = [1, 2, 3, 4];
    const result = numbers.reduce2((acc, curr) => acc + curr, 10);

    expect(result).toBe(20);
  });

  it(
    'should use the first element as the initial value' +
      'and start from index 1 if startValue is not provided',
    () => {
      const numbers = [1, 2, 3, 4];
      const result = numbers.reduce2((acc, curr) => acc + curr);

      expect(result).toBe(10);
    },
  );

  it(
    'should pass all 4 correct arguments' + 'to the callback on each iteration',
    () => {
      const arr = ['a'];
      const callbackMock = jest.fn((acc, curr) => acc + curr);

      arr.reduce2(callbackMock, 'start');

      expect(callbackMock).toHaveBeenCalledWith('start', 'a', 0, arr);
    },
  );

  it(
    'should return the initial value immediately without calling the callback' +
      'if the array is empty',
    () => {
      const emptyArray = [];
      const callbackMock = jest.fn();
      const result = emptyArray.reduce2(callbackMock, 100);

      expect(result).toBe(100);
      expect(callbackMock).not.toHaveBeenCalled();
    },
  );

  it('should successfully handle complex object transformations', () => {
    const fruits = ['apple', 'banana', 'apple'];
    const result = fruits.reduce2((acc, fruit) => {
      acc[fruit] = (acc[fruit] || 0) + 1;

      return acc;
    }, {});

    expect(result).toEqual({ apple: 2, banana: 1 });
  });

  it('throws TypeError on empty array without initial value', () => {
    const cb = jest.fn();

    expect(() => [].reduce2(cb)).toThrow(TypeError);
  });
});
