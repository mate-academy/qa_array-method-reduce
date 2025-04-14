'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  const data = [1, 2, 3, 4, 5];
  let callback;

  beforeEach(() => {
    callback = jest.fn((prev, x) => prev + x);
  });

  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should be declared', () => {
    expect(data.reduce2).toBeInstanceOf(Function);
  });

  it('callback should be called for each value in the array', () => {
    data.reduce2(callback, 10);

    expect(callback).toHaveBeenCalledTimes(data.length);
  });

  it('should return correct value', () => {
    const result = data.reduce2(callback, 10);

    ;

    expect(result).toBe(25);
  });

  it('should be called every callbacks with the correct parameters', () => {
    data.reduce2(callback, 1);

    expect(callback).toHaveBeenCalledWith(1, 1, 0, data);
    expect(callback).toHaveBeenCalledWith(2, 2, 1, data);
    expect(callback).toHaveBeenNthCalledWith(5, 11, 5, 4, data);
  });

  it('A callback should not be called for an empty array', () => {
    [].reduce2(callback, 1);

    expect(callback).not.toHaveBeenCalled();
  });

  it(`should return the data type, which must`
    + ` be the same as startValue`, () => {
    const startValue = 1;
    const result = data.reduce2(callback, startValue);

    const startValue2 = '';
    const result2 = ['H', 'e', 'l', 'l', 'o'].reduce2(callback, startValue2);

    expect(typeof result).toBe(typeof startValue);
    expect(typeof result2).toBe(typeof startValue2);
  });
});
