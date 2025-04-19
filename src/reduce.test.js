'use strict';

const { reduce } = require('./reduce');

const numArray = [7, 15, 21, 4];
const strArray = ['red', 'yellow', 'green', 'blue'];

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should work if only a callback provided', () => {
    const result = numArray.reduce2((acc, value) => acc + value);

    expect(result).toBe(47);
  });

  it('should add startValue if provided', () => {
    const result = numArray.reduce2((acc, value) => acc + value, 10);

    expect(result).toBe(57);
  });

  it('should return startValue for an empty array', () => {
    const result = [].reduce2((acc, value) => acc + value, 10);

    expect(result).toBe(10);
  });

  it('should return undefined for an empty array without startValue ', () => {
    const callback = jest.fn((acc, value) => acc + value);
    const result = [].reduce2(callback);

    expect(result).toBeUndefined();
    expect(callback).not.toHaveBeenCalled();
  });

  it(
    `should return sum of array first element and startValue
     for one element array and startValue`,
    () => {
      const result = [27].reduce2((acc, curr) => acc + curr, 10);

      expect(result).toBe(37);
    }
  );

  it(
    `should return array first element for one element array
    and without startValue`,
    () => {
      const result = [5].reduce2((acc, curr) => acc + curr);

      expect(result).toBe(5);
    }
  );

  it('should return string for an array of strings', () => {
    const result = strArray.reduce2((acc, value) => acc + `-${value}`);

    expect(result).toBe('red-yellow-green-blue');
  });

  it(
    `should be called one less time than the length of the array
    if startValue is not provided`,
    () => {
      const callback = jest.fn();

      numArray.reduce2(callback);

      expect(callback).toHaveBeenCalledTimes(numArray.length - 1);
    }
  );

  it('should call callback with appropriate arguments', () => {
    const callback = jest.fn((acc, value) => acc + value);

    numArray.reduce2(callback, 0);

    expect(callback).toHaveBeenCalledWith(0, 7, 0, [7, 15, 21, 4]);
    expect(callback).toHaveBeenCalledWith(7, 15, 1, [7, 15, 21, 4]);
    expect(callback).toHaveBeenCalledWith(22, 21, 2, [7, 15, 21, 4]);
    expect(callback).toHaveBeenCalledWith(43, 4, 3, [7, 15, 21, 4]);
  });
});
