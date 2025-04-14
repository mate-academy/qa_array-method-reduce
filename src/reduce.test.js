'use strict';

const { reduce } = require('./reduce');

const example = [1, 2, 3, 4, 5];

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should be declared', () => {
    expect(reduce).toBeInstanceOf(Function);
  });

  it('should call callback once per item', () => {
    const f = jest.fn();

    example.reduce(f, 0);

    expect(f).toHaveBeenCalledTimes(5);
  });

  it('should call callback once per item,'
    + 'if start value is NOT provided', () => {
    const f = jest.fn();

    example.reduce2(f);

    expect(f).toHaveBeenCalledTimes(4);
  });

  it(`if 'startValue' is not provided should `
    + `take first item in array as a 'startValue`, () => {
    const f = jest.fn();

    example.reduce2(f);

    expect(f.mock.calls[0]).toEqual([1, 2, 1, [1, 2, 3, 4, 5]]);
  });

  it(`should pass startValue, element,`
    + `index and an array to a callback`, () => {
    const items = [34, 5, 7, 18, 100];

    const f = jest.fn();

    items.reduce2(f);

    expect(f).toHaveBeenNthCalledWith(1, 34, 5, 1, [34, 5, 7, 18, 100]);
  });

  it('should not call callback for empty array', () => {
    const f = jest.fn();

    [].reduce2(f);

    expect(f).not.toHaveBeenCalled();
  });

  it('should return correct value', () => {
    const callback1 = (acc, b) => acc + b;
    const callback2 = (acc, b) => acc * b;
    const callback3 = (acc, b) => acc / b;

    const result1 = example.reduce2(callback1, 0);
    const result2 = example.reduce2(callback2);
    const result3 = example.reduce2(callback3);

    expect(result1).toBe(15);
    expect(result2).toBe(120);
    expect(result3).toBe(0.008333333333333333);
  });

  it('should not modify original array', () => {
    const original = [...example];

    example.reduce2((acc, b) => acc + b, 0);

    expect(example).toEqual(original);
  });

  it('should concatenate an array of strings', () => {
    const strings = ['a', 'b', 'c', 'd'];

    const result = strings.reduce2((acc, cur) => acc + cur, '');

    expect(result).toBe('abcd');
  });

  it('should throw TypeError if no callback function is provided', () => {
    const numbers = [1, 2, 3, 4];

    expect(() => numbers.reduce2()).toThrow(TypeError);
  });

  it('should handle an empty array with initial value correctly', () => {
    const result = [].reduce2((acc, cur) => acc + cur, 10);

    expect(result).toBe(10);
  });

  it('should handle an array of objects and return a single object', () => {
    const arrayOfObjects = [{ a: 1 }, { b: 2 }, { c: 3 }];

    const mergedObject = arrayOfObjects.reduce2((acc, cur) => ({
      ...acc, ...cur,
    }), {});

    expect(mergedObject).toEqual({
      a: 1, b: 2, c: 3,
    });
  });
});
