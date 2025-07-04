'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  let callback;

  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  beforeEach(() => {
    callback = jest.fn();
  });

  it('should be declared', () => {
    expect(reduce).toBeInstanceOf(Function);
  });

  it('should call callback with correct arguments in order', () => {
    callback.mockImplementation((prev, current) => prev + current);

    [1, 2, 3].reduce2(callback, 1);

    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenNthCalledWith(1, 1, 1, 0, [1, 2, 3]);
    expect(callback).toHaveBeenNthCalledWith(2, 2, 2, 1, [1, 2, 3]);
    expect(callback).toHaveBeenNthCalledWith(3, 4, 3, 2, [1, 2, 3]);
  });

  it('should result be correct', () => {
    callback.mockImplementation((prev, current) => prev + current);

    const result = [2, 3, 10, 20].reduce2(callback, 0);

    expect(callback).toHaveBeenCalledTimes(4);
    expect(result).toBe(35);
  });

  it('should reduce array without initial value correctly', () => {
    callback.mockImplementation((prev, current) => prev + current);

    const result = [2, 3, 10, 20].reduce2(callback);

    expect(callback).toHaveBeenCalledTimes(3);
    expect(result).toBe(35);
  });

  it('should handle empty array with initial value', () => {
    callback.mockImplementation((prev, current) => prev + current);

    const result = [].reduce2(callback, 20);

    expect(result).toBe(20);
  });
});
