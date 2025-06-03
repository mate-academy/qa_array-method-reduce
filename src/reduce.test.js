'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  // Перед усіма тестами додаємо метод reduce2 до масиву
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  // Після усіх тестів видаляємо метод reduce2
  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should return the sum of array elements', () => {
    const result = [1, 2, 3].reduce2((acc, val) => acc + val, 0);

    expect(result).toBe(6);
  });

  it('should concatenate strings', () => {
    const result = ['Hello', ' ', 'world'].reduce2((acc, val) => acc + val, '');

    expect(result).toBe('Hello world');
  });

  it('should return the correct value without initial value', () => {
    const result = [10, 20, 30].reduce2((acc, val) => acc + val);

    expect(result).toBe(60);
  });

  it('should handle single-element array with no initial value', () => {
    const result = [42].reduce2((acc, val) => acc + val);

    expect(result).toBe(42);
  });

  it('should throw if array is empty and no initial value is provided', () => {
    expect(() => {
      [].reduce2((acc, curr) => acc + curr);
    }).toThrow(new TypeError('Reduce of empty array with no initial value'));
  });
});
