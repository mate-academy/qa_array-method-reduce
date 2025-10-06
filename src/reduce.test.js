'use strict';

const { reduce } = require('./reduce');

const nums = [1, 2, 3, 4];
const strings = ['1', '2', '3'];
let callback;

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  beforeEach(() => {
    callback = jest.fn((acc, curr) => acc + curr);
  });

  it('should have instance of function', () => {
    expect(reduce).toBeInstanceOf(Function);
  });

  it('should use callback for all items in array', () => {
    const init = 10;

    nums.reduce2(callback, init);

    expect(callback).toHaveBeenCalledTimes(nums.length);
  });

  it('should work without initial value', () => {
    const result = nums.reduce2(callback);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(3);
    expect(result).toBe(10);
  });

  it('should work without initial array', () => {
    const init = 10;
    const result = [].reduce2(callback, init);

    expect(callback).not.toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(0);
    expect(result).toBe(10);
  });

  it('should return undefined without array and initial value', () => {
    const result = [].reduce2(callback);

    expect(result).toBe(undefined);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should work with strings', () => {
    const check = '123';
    const result = strings.reduce2(callback);

    expect(result).toBe(check);
  });

  it('should skip initial value if it is specified', () => {
    const result = [1, 1, 2].reduce2(callback, null);

    expect(result).toBe(4);
  });

  it('should invoke callback for indexes without value', () => {
    [1, '', '', 1, 2].reduce2(callback);

    expect(callback).toHaveBeenCalledTimes(4);
  });
});
