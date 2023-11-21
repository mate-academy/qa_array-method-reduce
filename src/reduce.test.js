'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce;
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should sum all numbers in an array', () => {
    const array = [1, 2, 3, 4, 5];
    const result = array.reduce2((acc, cur) => acc + cur, 0);
    expect(result).toBe(15);
  });

  it('should concatenate strings in an array', () => {
    const array = ['Hello', ' ', 'World', '!'];
    const result = array.reduce2((acc, cur) => acc + cur, '');
    expect(result).toBe('Hello World!');
  });

  it('should work with no initial value', () => {
    const array = [1, 2, 3, 4, 5];
    const result = array.reduce2((acc, cur) => acc + cur);
    expect(result).toBe(15);
  });

  it('should throw TypeError if array is empty and no initial value is provided', () => {
    const array = [];
    expect(() => array.reduce2((acc, cur) => acc + cur)).toThrow(TypeError);
  });

  it('should return the initial value if array is empty', () => {
    const array = [];
    const result = array.reduce2((acc, cur) => acc + cur, 10);
    expect(result).toBe(10);
  });

  it('should work with array-like objects', () => {
    const arrayLike = { length: 3, 0: 1, 1: 2, 2: 3 };
    const result = Array.prototype.reduce2.call(
      arrayLike, 
      (acc, cur) => acc + cur, 
      0
    );
    expect(result).toBe(6);
  });
});
