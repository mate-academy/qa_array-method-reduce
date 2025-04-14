'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  let callback;

  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  beforeEach(() => {
    callback = jest.fn();
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  afterEach(() => {
    callback.mockReset();
  });

  it('should be declare', () => {
    expect(reduce).toBeInstanceOf(Function);
  });

  it('should be called TypeError if the array contains no elements'
    + 'and no initial value is specified.', () => {
    expect(() => {
      [].reduce2(callback);
    }).toThrow(TypeError);
  });

  it('should be called each time for item in array'
  + 'if initial value is provided', () => {
    [1, 2, 3].reduce2(callback, 5);

    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('should be called array.lenght - 1 time '
  + 'if initial value is not provided', () => {
    [1, 2, 3].reduce2(callback);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should calculated value', () => {
    callback.mockImplementation((acc, curr) => curr + acc);

    const resultWithInitialValue = [1, 2, 3].reduce2(callback, 5);
    const resultWithoutInitialValue = [1, 2, 3].reduce2(callback);

    expect(resultWithInitialValue).toBe(11);
    expect(resultWithoutInitialValue).toBe(6);
  });

  it('should call callback with 4 correct value', () => {
    callback.mockImplementation((acc, curr) => curr + acc);

    const array = [1, 2, 3];

    array.reduce2(callback, 5);

    expect(callback).toHaveBeenCalledWith(5, 1, 0, array);
    expect(callback).toHaveBeenCalledWith(6, 2, 1, array);
    expect(callback).toHaveBeenCalledWith(8, 3, 2, array);
  });
});
