'use strict';

const { reduce } = require('./reduce');

describe('The reduce function', () => {
  beforeAll(() => {
    jest.spyOn(Array.prototype, 'reduce').mockImplementation(reduce);
  });

  afterAll(() => {
    Array.prototype.reduce.mockRestore();
  });

  it('should be declared', () => {
    expect(reduce).toBeInstanceOf(Function);
  });

  describe('With a start value', () => {
    it('should not call the callback for an empty array', () => {
      const fn = jest.fn();
      const startValue = 10;

      [].reduce(fn, startValue);
      expect(fn).not.toHaveBeenCalled();
    });

    it('should return the start value for an empty array', () => {
      const fn = () => 1;
      const startValue = 10;

      expect([].reduce(fn, startValue)).toBe(startValue);
    });

    it('should call the callback for each item', () => {
      const fn = jest.fn();
      const items = [1, 2, 3];

      items.reduce(fn, 0);
      expect(fn).toHaveBeenCalledTimes(items.length);
    });

    it('should pass the correct arguments to the callback', () => {
      const startValue = 0;
      const items = [1, 2, 3];
      const fn = jest.fn((_acc, v) => v);

      items.reduce(fn, startValue);

      for (let i = 0; i < items.length; i++) {
        expect(fn).toHaveBeenNthCalledWith(
          i + 1,
          items[i - 1] || startValue,
          items[i],
          i,
          items,
        );
      }
    });

    it('should return the correct result', () => {
      const items = [1, 2, 3];
      const sumFn = jest.fn((sum, v) => sum + v);

      expect(items.reduce(sumFn, 0)).toBe(6);
    });
  });

  describe('Without a start value', () => {
    it('should not call the callback for an empty array', () => {
      const fn = jest.fn();

      [].reduce(fn);
      expect(fn).not.toHaveBeenCalled();
    });

    it('should return undefined for an empty array', () => {
      const items = [];
      const fn = jest.fn(() => 1);

      expect(items.reduce(fn)).toBeUndefined();
    });

    it('should use the first item as the start value', () => {
      const fn = jest.fn();
      const items = [1, 2, 3];

      items.reduce(fn);
      expect(fn).toHaveBeenNthCalledWith(1, items[0], items[1], 1, items);
    });

    it('should skip the first item', () => {
      const fn = jest.fn();
      const items = [1, 2, 3];

      items.reduce(fn);
      expect(fn).toHaveBeenCalledTimes(items.length - 1);
    });

    it('should pass the correct arguments to the callback', () => {
      const items = [1, 2, 3];
      const fn = jest.fn((_acc, v) => v);

      items.reduce(fn);

      for (let i = 1; i < items.length; i++) {
        expect(fn).toHaveBeenNthCalledWith(i, items[i - 1], items[i], i, items);
      }
    });

    it('should return the correct result', () => {
      const items = [1, 2, 3];
      const sumFn = jest.fn((sum, v) => sum + v);

      expect(items.reduce(sumFn)).toBe(6);
    });
  });
});
