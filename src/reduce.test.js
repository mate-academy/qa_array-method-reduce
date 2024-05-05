'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should be declared', () => {
    expect(Array.prototype.reduce2).toBeInstanceOf(Function);
  });

  it('should work with an array of numbers', () => {
    const array = [1, 2, 3, 4];

    const result = array.reduce2((a, b) => a + b, 0);

    expect(result).toBe(10);
  });

  it('should work with an array of strings', () => {
    const array = ['q', 'w', 'e', 'r'];

    const result = array.reduce2((a, b) => a + b, '');

    expect(result).toBe('qwer');
  });
  
  it('should work with an empty array', () => {
    const array = [];

    const result = array.reduce2((a, b) => a + b, 0);

    expect(result).toBe(0);
  });
  
  it('should work without an initial value', () => {
    const array = [1, 2, 3];

    const result = array.reduce2((a, b) => a + b);

    expect(result).toBe(6);
  });
});
