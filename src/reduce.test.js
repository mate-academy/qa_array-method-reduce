'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  const array = [1, 2, 3, 4, 5];
  let concatenation;

  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  beforeEach(() => {
    concatenation = jest.fn((a, b) => a + b);
  });

  it(`should be declared`, () => {
    expect(Array.prototype.reduce2).toBeInstanceOf(Function);
  });

  it('should return correct result for two arguments', () => {
    const result = array.reduce2(concatenation, 0);

    expect(result).toBe(15);
  });

  it('should return correct result for one argument', () => {
    const result = array.reduce2(concatenation);

    expect(result).toBe(15);
  });

  it('should return correct result for multiply'
    + ' as callback for one argument', () => {
    const multiply = jest.fn((a, b) => a * b);
    const result = array.reduce2(multiply);

    expect(result).toBe(120);
  });

  it('should return the same type variable as'
    + ' accumulator if number passed', () => {
    const accum = 0;
    const result = array.reduce2(concatenation, accum);

    expect(typeof result).toBe(typeof accum);
  });

  it('should return the same type variable as'
    + ' accumulator if string passed', () => {
    const accum = '';
    const result = array.reduce2(concatenation, accum);

    expect(typeof result).toBe(typeof accum);
  });

  it('should return correct result for array of string'
    + ' if concatenation passed as callback', () => {
    const arrayOfString = ['a', 'b', 'c', 'd'];
    const result = arrayOfString.reduce2(concatenation);

    expect(result).toBe('abcd');
  });

  it('should execute callback one time less as array'
    + ' length if accum doesn\'t passed', () => {
    array.reduce2(concatenation);

    expect(concatenation).toHaveBeenCalledTimes(array.length - 1);
  });

  it('should execute callback the same time as array'
    + ' length if accum passed', () => {
    array.reduce2(concatenation, 0);

    expect(concatenation).toHaveBeenCalledTimes(array.length);
  });

  it('should execute callback with correct'
    + ' arguments if accum doesn\'t passed', () => {
    array.reduce2(concatenation);

    expect(concatenation.mock.calls[0]).toEqual([1, 2, 1, [1, 2, 3, 4, 5]]);
    expect(concatenation).toHaveBeenNthCalledWith(2, 3, 3, 2, [1, 2, 3, 4, 5]);
    expect(concatenation).toHaveBeenCalledWith(6, 4, 3, [1, 2, 3, 4, 5]);
    expect(concatenation.mock.calls[3]).toEqual([10, 5, 4, [1, 2, 3, 4, 5]]);
  });

  it('should execute callback with correct arguments if accum passed', () => {
    array.reduce2(concatenation, 0);

    expect(concatenation).toHaveBeenNthCalledWith(1, 0, 1, 0, [1, 2, 3, 4, 5]);
    expect(concatenation).toHaveBeenCalledWith(1, 2, 1, [1, 2, 3, 4, 5]);
    expect(concatenation.mock.calls[2]).toEqual([3, 3, 2, [1, 2, 3, 4, 5]]);
    expect(concatenation).toHaveBeenNthCalledWith(4, 6, 4, 3, [1, 2, 3, 4, 5]);
    expect(concatenation).toHaveBeenCalledWith(10, 5, 4, [1, 2, 3, 4, 5]);
  });
});
