'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should call a callback once per item ', () => {
    const items = [1, 2, 3];

    const f = jest.fn();

    items.reduce2(f, 0);
    expect(f).toHaveBeenCalledTimes(3);
  });

  it(`should call a callback once per item start from 1 index
    if arg.length < 2`, () => {
    const items = [1, 2, 3];

    const f = jest.fn((a, b) => a + b);

    const result = items.reduce2(f);

    expect(f).toHaveBeenCalledTimes(2);
    expect(result).toBe(6);
  });

  it('should return accumulator', () => {
    const items = [1, 2, 3, 4];

    const f = (a, b) => a + b;

    const result = items.reduce2(f, 0);

    expect(result).toBe(10);
  });

  it(`shouldn't call a callback 
    if input array has onle one element and isn't an accumulator`, () => {
    const items = [1];

    const f = jest.fn();

    const result = items.reduce2(f);

    expect(f).not.toHaveBeenCalled();
    expect(result).toBe(1);
  });

  it(`shouldn't call a callback 
    if input array is empty and theere is an accumulator`, () => {
    const items = [];

    const f = jest.fn();

    const result = items.reduce2(f, 0);

    expect(f).not.toHaveBeenCalled();
    expect(result).toBe(0);
  });

  it(`should pass prev, an element, an index 
    and an array to a callback`, () => {
    const items = [1, 2, 3];

    const f = jest.fn();

    items.reduce2(f, 0);

    expect(f.mock.calls[0]).toEqual([0, 1, 0, items]);
  });

  it(`should throw TypeError 
    if input array is empty and there isn't an accumulator`, () => {
    const f = jest.fn();

    expect(() => [].reduce2(f)).toThrow(TypeError);
  });
});
