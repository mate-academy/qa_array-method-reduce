'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  let callback = () => {};

  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  beforeEach(() => {
    callback = jest.fn();
  });

  const items = [1, 2, 3];

  it(`should call a callback once per each item
  if initial value was passed`, () => {
    items.reduce2(callback, 5);

    expect(callback.mock.calls.length).toBe(3);
  });

  it(`should call a callback array.length - 1 times
  if initial value was not passed`, () => {
    items.reduce2(callback);

    expect(callback.mock.calls.length).toBe(2);
  });

  it('should not call a callback for an empty array', () => {
    [].reduce2(callback);

    expect(callback).not.toHaveBeenCalled();
  });

  it.skip(`should throw an error if an array contains no elements
  and initialValue is not provided`, () => {
    expect([].reduce2(callback)).toThrow();
  });

  it(`should pass an accumulator, an element, an index
  and an array to a callback`, () => {
    callback.mockReturnValue(0);

    items.reduce2(callback, 0);
    expect(callback).toHaveBeenNthCalledWith(1, 0, 1, 0, items);
    expect(callback).toHaveBeenNthCalledWith(3, 0, 3, 2, items);
  });

  it('should return proper value', () => {
    callback = jest.fn((accum, element) => accum + element);

    const stringItems = ['Its', ' my', ' test'];

    expect(items.reduce2(callback, 0)).toBe(6);
    expect(items.reduce2(callback)).toBe(6);
    expect(stringItems.reduce2(callback, '')).toBe('Its my test');
    expect(stringItems.reduce2(callback)).toBe('Its my test');
  });

  it(`should invoke the callback function starting at index 1
  if array.length > 0 and initialValue is not provided`, () => {
    items.reduce2(callback);
    expect(callback).toHaveBeenNthCalledWith(1, 1, 2, 1, items);
  });

  it(`should return the first element if array.length === 1
  and initialValue is not provided`, () => {
    expect([50].reduce2(callback)).toBe(50);
  });

  it(`should not invoke the callback if array.length === 1
  and initialValue is not provided`, () => {
    [50].reduce2(callback);
    expect(callback).not.toHaveBeenCalled();
  });

  it(`should return the initialValue if array.length === 0`, () => {
    expect([].reduce2(callback, 4)).toBe(4);
  });

  it(`should return the same value as the last call of the callback`, () => {
    callback
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(50);
    expect(items.reduce2(callback, 1)).toBe(50);
  });
});
