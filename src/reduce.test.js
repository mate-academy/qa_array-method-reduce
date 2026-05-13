'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it(
    'should return array element ' +
      'if array has one element and no initial value is provided',
    () => {
      const array = [4];
      const mockCallback = jest.fn((x) => x + 2);
      const result = array.reduce2(mockCallback);

      expect(result).toBe(4);
    },
  );

  it(
    'should not call callbackFn ' +
      'if array has one element and no initial value is provided',
    () => {
      const array = [4];
      const mockCallback = jest.fn((x) => x + 2);

      array.reduce2(mockCallback);

      expect(mockCallback).not.toHaveBeenCalled();
    },
  );

  it(
    'should return initialValue ' +
      'if initialValue is provided but the array is empty',
    () => {
      const array = [];

      const mockCallback = jest.fn((x) => x + 2);
      const result = array.reduce2(mockCallback, 4);

      expect(result).toBe(4);
    },
  );

  it(
    'should not call callbackFn ' +
      'if initialValue is provided but the array is empty',
    () => {
      const array = [];

      const mockCallback = jest.fn((x) => x + 2);
      const result = array.reduce2(mockCallback, 4);

      expect(result).toBe(4);
      expect(mockCallback).not.toHaveBeenCalled();
    },
  );

  it(
    'should invoke the callback once for element at index 1 ' +
      'if length of array is equal to 1 and initialValue is not provided',
    () => {
      const array = [1, 100];
      const mockCallback = jest.fn((a, b) => Math.max(a, b));

      const result = array.reduce2(mockCallback);

      expect(mockCallback.mock.calls).toHaveLength(1);
      expect(mockCallback.mock.calls[0][0]).toBe(1);
      expect(mockCallback.mock.calls[0][1]).toBe(100);
      expect(mockCallback.mock.results[0].value).toBe(100);
      expect(result).toBe(100);
    },
  );

  it(
    'should invoke the callback for each element starting at index 0 ' +
      'if initialValue is provided and the array is not empty, ',
    () => {
      const array = [2, 3, 4];
      const mockCallback = jest.fn(
        (accumulator, currentValue) => accumulator + currentValue,
      );

      const result = array.reduce2(mockCallback, 1);

      expect(mockCallback.mock.calls).toHaveLength(3);
      expect(mockCallback.mock.calls[0][1]).toBe(2);
      expect(mockCallback.mock.calls[1][1]).toBe(3);
      expect(mockCallback.mock.calls[2][1]).toBe(4);
      expect(result).toBe(10);
    },
  );

  it(
    'should invoke the callback for each element starting at index 1 ' +
      'if initialValue is not provided and the array is not empty, ',
    () => {
      const array = [2, 3, 4];
      const mockCallback = jest.fn(
        (accumulator, currentValue) => accumulator + currentValue,
      );

      const result = array.reduce2(mockCallback);

      expect(mockCallback.mock.calls).toHaveLength(2);
      expect(mockCallback.mock.calls[0][1]).toBe(3);
      expect(mockCallback.mock.calls[1][1]).toBe(4);
      expect(result).toBe(9);
    },
  );

  it(
    'should return correct value ' +
      'from the calculation on the preceding element',
    () => {
      const array = [2, 3, 4];
      const mockCallback = jest.fn(
        (accumulator, currentValue) => accumulator + currentValue,
      );

      array.reduce2(mockCallback, 1);

      expect(mockCallback.mock.calls[0][0]).toBe(1);
      expect(mockCallback.mock.results[0].value).toBe(3);
      expect(mockCallback.mock.calls[1][0]).toBe(3);
      expect(mockCallback.mock.results[1].value).toBe(6);
      expect(mockCallback.mock.calls[2][0]).toBe(6);
      expect(mockCallback.mock.results[2].value).toBe(10);
    },
  );

  it('should return correct single value as a final result', () => {
    const array = ['B', 'B', 'G', 'L', 'M', 'G'];
    const mockCallback = jest.fn(
      (accumulator, currentValue) => accumulator + currentValue + 'A',
    );

    const result = array.reduce2(mockCallback, 'A');

    expect(result).toBe('ABABAGALAMAGA');
  });
});
