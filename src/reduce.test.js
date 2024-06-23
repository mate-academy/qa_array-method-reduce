'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  /**
   * @type {jest.Mock}
   */
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

  it('should not modify initial array', () => {
    const items = [1, 2, 3];

    items.reduce(callback.mockReturnValue(10), 10);

    expect(items).toEqual([1, 2, 3]);
  });

  it('should not call callback if array is empty', () => {
    [].reduce(callback, 'some value');

    expect(callback).not.toHaveBeenCalled();
  });

  it('should call callback array length times if startValue provided', () => {
    Array.from({ length: 5 }, () => 1).reduce2(callback, 0);

    expect(callback).toHaveBeenCalledTimes(5);
  });

  it('should call callback with correct arguments', () => {
    const numbers = [1, 2, 3];

    callback.mockImplementation((acc) => acc + 1);
    numbers.reduce2(callback, 0);

    expect(callback).toHaveBeenNthCalledWith(2, 1, 2, 1, numbers);
  });

  it('should return reduced value', () => {
    callback.mockImplementation((acc, num) => acc + num);

    const result = [1, 2, 4].reduce2(callback, -2);

    expect(result).toBe(5);
  });

  it('should not to call callback if startValue missing and array length 1', () => {
    [1].reduce2(callback);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should startValue be a first element if it is not provided', () => {
    const result = ['First value'].reduce2(callback.mockReturnValue((acc) => acc));

    expect(result).toBe('First value');
  });

  it('should call with correct arguments if startValue is not provided', () => {
    const items = ['first', 'second'];

    items.reduce2(callback.mockReturnValue('not acc'));

    expect(callback).toHaveBeenNthCalledWith(1, 'first', 'second', 1, items);
  });
});
