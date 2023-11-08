'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  let temp;

  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  beforeEach(() => {
    temp = jest.fn();
  });

  it('should be declared', () => {
    expect(reduce).toBeInstanceOf(Function);
  });

  it(`should call a Cb once per item
  if initialValue passed`, () => {
    const items = [1, 2, 3, 4];

    items.reduce2(temp, 0);

    expect(temp).toHaveBeenCalledTimes(4);
  });

  it('should call a Cb (array.length - 1) times'
  + ' if initialValue did not passed', () => {
    const items = [1, 2, 3, 4, 5, 6];

    items.reduce2(temp);

    expect(temp).toHaveBeenCalledTimes(5);
  });

  it(`should return initialValue
  for an empty array`, () => {
    expect([].reduce2(temp, 5)).toBe(5);
  });

  it(`should pass value from the previous call,
  element, index, array to a Cb`, () => {
    const items = [10, 20, 30, 40];

    temp = jest.fn((prev, current) => prev + current);

    items.reduce2(temp, 0);

    expect(temp).toHaveBeenNthCalledWith(1, 0, 10, 0, items);
    expect(temp).toHaveBeenNthCalledWith(2, 10, 20, 1, items);
    expect(temp).toHaveBeenNthCalledWith(3, 30, 30, 2, items);
    expect(temp).toHaveBeenNthCalledWith(4, 60, 40, 3, items);
  });

  it('should return correct value', () => {
    const items = [10, 20, 30, 40];

    temp = jest.fn((prev, current) => prev + current);

    expect(items.reduce2(temp, 0)).toBe(100);
  });
});
