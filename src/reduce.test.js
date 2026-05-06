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

  it('should be call callback with correct arguments in order', () => {
    callback.mockImplementation((prev, curr) => prev + curr);

    [1, 2, 3, 4].reduce2(callback, 0);

    expect(callback).toHaveBeenCalledTimes(4);
    expect(callback).toHaveBeenNthCalledWith(1, 0, 1, 0, [1, 2, 3, 4]);
    expect(callback).toHaveBeenNthCalledWith(2, 1, 2, 1, [1, 2, 3, 4]);
    expect(callback).toHaveBeenNthCalledWith(3, 3, 3, 2, [1, 2, 3, 4]);
    expect(callback).toHaveBeenNthCalledWith(4, 6, 4, 3, [1, 2, 3, 4]);
  });

  it('should result be correct', () => {
    callback.mockImplementation((prev, curr) => prev + curr);

    const result = [1, 2, 3, 4].reduce2(callback, 0);

    expect(callback).toHaveBeenCalledTimes(4);
    expect(result).toBe(10);
  });

  it('should reduce array without initial value correctly', () => {
    callback.mockImplementation((prev, curr) => prev + curr);

    const result = [1, 2, 3, 4].reduce2(callback);

    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenNthCalledWith(1, 1, 2, 1, [1, 2, 3, 4]);
    expect(callback).toHaveBeenNthCalledWith(2, 3, 3, 2, [1, 2, 3, 4]);
    expect(callback).toHaveBeenNthCalledWith(3, 6, 4, 3, [1, 2, 3, 4]);
    expect(result).toBe(10);
  });

  it('should be handle empty array with initial value', () => {
    callback.mockImplementation((prev, curr) => prev + curr);

    const result = [].reduce2(callback, 1);

    expect(result).toBe(1);
  });
});
