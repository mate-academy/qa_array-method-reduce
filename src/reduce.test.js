'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should correctly sum numbers with initial value', () => {
    const result = [1, 2, 3].reduce2((acc, val) => acc + val, 0);

    expect(result).toBe(6);
  });

  it('should return the initial value for an empty array', () => {
    const result = [].reduce2((acc, val) => acc + val, 0);

    expect(result).toBe(0);
  });

  it('should correctly work without an initial value', () => {
    const result = [1, 2, 3].reduce2((acc, val) => acc + val);

    expect(result).toBe(6);
  });

  it('should call the callback the correct number of times', () => {
    const callback = jest.fn((acc, val) => acc + val);
    const arr = [1, 2, 3, 4, 5];

    arr.reduce2(callback, 0);

    expect(callback).toHaveBeenCalledTimes(5);
  });

  it(
    'should call the callback n - 1'
    + 'times when no initial value is provided',
    () => {
      const callback = jest.fn((acc, val) => acc + val);
      const arr = [1, 2, 3, 4, 5];

      arr.reduce2(callback);

      expect(callback).toHaveBeenCalledTimes(4);
    }
  );

  it('should correctly concatenate strings', () => {
    const result = ['Hello', 'world', '!'].reduce2((acc, val) => acc + val, '');

    expect(result).toBe('Helloworld!');
  });
});
