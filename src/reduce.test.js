'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should be declared and be an instance of Function', () => {
    expect(reduce).toBeInstanceOf(Function);
  });

  it('should handle an empty array and return the start value', () => {
    const f = jest.fn();
    const array = [];

    const result = array.reduce2(f, 10);

    expect(f).not.toHaveBeenCalled();
    expect(result).toEqual(10);
  });

  it(`should callback 1 times less if initialValue is not specified`, () => {
    const f = jest.fn((acc, current) => acc + current);
    const array = [1, 2, 3, 4];

    const result = array.reduce2(f);

    expect(f).toHaveBeenCalledTimes(3);
    expect(result).toEqual(10);
  });

  it(`should correctly accumulate values with an array.length === 1`, () => {
    const f = jest.fn((acc, current) => acc + current);
    const array = [1];

    const result = array.reduce2(f, 0);

    expect(f).toHaveBeenCalledTimes(1);
    expect(f).toHaveBeenCalledWith(0, 1, 0, [1]);

    expect(result).toEqual(1);
  });

  it(`should accumulate values correctly using the provided callback
  and start value`, () => {
    const f = jest.fn((acc, current) => acc + current);
    const array = [1, 2, 3, 4];

    const result = array.reduce2(f, 0);

    expect(f).toHaveBeenCalledTimes(4);
    expect(f).toHaveBeenCalledWith(0, 1, 0, [1, 2, 3, 4]);
    expect(f).toHaveBeenCalledWith(1, 2, 1, [1, 2, 3, 4]);
    expect(f).toHaveBeenCalledWith(3, 3, 2, [1, 2, 3, 4]);
    expect(f).toHaveBeenCalledWith(6, 4, 3, [1, 2, 3, 4]);

    expect(result).toEqual(10);
  });
});
