'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should return the sum of all elements in the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = arr.reduce2((prev, curr) => prev + curr, 0);
    expect(result).toBe(15);
  });
  
  it('should return the product of all elements in the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = arr.reduce2((prev, curr) => prev * curr, 1);
    expect(result).toBe(120);
  });
  
  it('should work without an initial value', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = arr.reduce2((prev, curr) => prev + curr);
    expect(result).toBe(15);
  });
  
  it('should return the initial value for an empty array', () => {
    const arr = [];
    const result = arr.reduce2((prev, curr) => prev + curr, 0);
    expect(result).toBe(0);
  });
  
  it('should throw TypeError when called on null or undefined', () => {
    expect(() => {
      Array.prototype.reduce2.call(null, (prev, curr) => prev + curr, 0);
    }).toThrow(TypeError);
  
    expect(() => {
      Array.prototype.reduce2.call(undefined, (prev, curr) => prev + curr, 0);
    }).toThrow(TypeError);
  });
});

