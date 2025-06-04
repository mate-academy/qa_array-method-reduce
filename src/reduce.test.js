'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should sum numbers with initial value', () => {
    const result = [1, 2, 3, 4].reduce2(
      (acc, val) => acc + val,
      0
    );

    expect(result).toBe(10);
  });

  it('should multiply numbers with initial value', () => {
    const result = [2, 3, 4].reduce2(
      (acc, val) => acc * val,
      1
    );

    expect(result).toBe(24);
  });

  it('should reduce correctly without an initial value', () => {
    const result = [1, 2, 3].reduce2(
      (acc, val) => acc + val
    );

    expect(result).toBe(6);
  });

  it('should handle single-element array without initial value', () => {
    const result = [5].reduce2((acc, val) => acc + val);

    expect(result).toBe(5);
  });

  it('should handle empty array with initial value', () => {
    const result = [].reduce2((acc, val) => acc + val, 100);

    expect(result).toBe(100);
  });
});
