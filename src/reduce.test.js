'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should be defined', () => {
    expect(Array.prototype.reduce2).toBeInstanceOf(Function);
  });

  it(`should never call a callback for an empty array`, () => {
    const f = jest.fn();

    [].reduce2(f, 3);

    expect(f).not.toHaveBeenCalled();
  });

  it(`should never call a callback in case of only one element in array `
  + `without initial value passed as argument`, () => {
    const f = jest.fn();

    [].reduce2(f);

    expect(f).not.toHaveBeenCalled();
  });

  it(`should call a callback once for each array element`
  + `if initial value passed as argument`, () => {
    const array = [1, 2, 3, 4, 5, 6];

    const f = jest.fn();

    array.reduce2(f, 0);

    expect(f).toHaveBeenCalledTimes(array.length);
  });

  it(`should call a callback once for each array element exept first `
  + `if initial value not passed as argument`, () => {
    const array = [1, 2, 3, 4, 5, 6];

    const f = jest.fn();

    array.reduce2(f);

    expect(f).toHaveBeenCalledTimes(array.length - 1);
  });

  it(`should call a callback first time for second element of array `
  + `if initial value not passed as argument`, () => {
    const array = [1, 2, 3, 4, 5, 6];

    const f = jest.fn();

    array.reduce2(f);

    expect(f.mock.calls[0]).toEqual([1, 2, 1, array]);
  });

  it(`should pass prev value, element, index and array `
    + `as arguments to a callback`, () => {
    const array = [1, 2, 3];

    const f = jest.fn((a, b) => a + b);

    array.reduce2(f, 0);

    expect(f.mock.calls[0]).toEqual([0, 1, 0, array]);
    expect(f.mock.calls[1]).toEqual([1, 2, 1, array]);
    expect(f.mock.calls[2]).toEqual([3, 3, 2, array]);
  });

  it(`should pass first element as first argument to first callback call`
    + `if initial value not passed as argument`, () => {
    const array = [1, 2, 3];

    const f = jest.fn((a, b) => a + b);

    array.reduce2(f);

    expect(f.mock.calls[0][0]).toEqual(1);
  });

  it(`should pass initial value as first argument to first callback call`
    + `if initial value passed as argument`, () => {
    const array = [1, 2, 3];

    const f = jest.fn((a, b) => a + b);

    array.reduce2(f, 10);

    expect(f.mock.calls[0][0]).toEqual(10);
  });

  it(`should pass result of previous callback call `
    + `as first argument to next callback calls starting from 2-nd call`
    + `if initial value passed as argument`, () => {
    const array = [1, 2, 3];

    const f = jest.fn((a, b) => a + b);

    array.reduce2(f, 0);

    expect(f.mock.calls[1][0]).toEqual(1);
    expect(f.mock.calls[2][0]).toEqual(3);
  });

  it(`should pass result of previous callback call `
  + `to next callback call as first argument starting from 2-nd call`
  + `if initial value passed as argument`, () => {
    const array = [1, 2, 3];

    const f = jest.fn((a, b) => a + b);

    array.reduce2(f);

    expect(f.mock.calls[1][0]).toEqual(3);
  });

  it(`should return value of the first element in case of 'array.length === 1'`
    + `and initial value not passed`, () => {
    const array = [];

    const f = jest.fn();

    array.reduce2(f, 3);

    expect(array.reduce2(f, 3)).toEqual(3);
  });

  it(`should return initial value for empty array`, () => {
    const array = [];

    const f = jest.fn();

    array.reduce2(f, 3);

    expect(array.reduce2(f, 3)).toEqual(3);
  });

  it(`should return result of last call of callback`, () => {
    const array = [1, 2, 3];

    const f = jest.fn((a, b) => a + b);

    array.reduce2(f, 0);

    expect(f.mock.results[2].value).toEqual(6);
  });

  it(`should return sum of array elements if callback function`
  + `'(a,b) => a + b'`, () => {
    expect([1, 2, 3, 4].reduce2((a, b) => a + b)).toEqual(10);
  });
});
