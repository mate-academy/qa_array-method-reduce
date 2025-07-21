'use strict';

const { reduce } = require('./reduce');

beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
});

afterAll(() => {
  delete Array.prototype.reduce2;
});

describe('reduce2', () => {
  it('should sum array values with initial value', () => {
    const arr = [1, 2, 3];
    const result = arr.reduce2((acc, val) => acc + val, 10);

    expect(result).toBe(16);
  });

  it('should use initial value if provided', () => {
    const arr = [1, 2, 3];
    const result = arr.reduce2((acc, val) => acc + val, 10);

    expect(result).toBe(16); // 10 + 1 + 2 + 3
  });

  it('should sum array values without initial value', () => {
    const arr = [1, 2, 3];
    const result = arr.reduce2((acc, val) => acc + val);

    expect(result).toBe(6); // 1 + 2 + 3
  });

  it('should multiply array values', () => {
    const arr = [2, 3, 4];
    const result = arr.reduce2((acc, val) => acc * val, 1);

    expect(result).toBe(24); // 1 * 2 * 3 * 4
  });

  it('should concatenate strings', () => {
    const arr = ['a', 'b', 'c'];
    const result = arr.reduce2((acc, val) => acc + val, '');

    expect(result).toBe('abc');
  });

  it('should handle single-element array with no initial value', () => {
    const arr = [5];
    const result = arr.reduce2((acc, val) => acc + val);

    expect(result).toBe(5); // returns the only element
  });

  it('should handle empty array with initial value', () => {
    const arr = [];
    const result = arr.reduce2((acc, val) => acc + val, 100);

    expect(result).toBe(100);
  });

  it('should return undefined on empty array with no initial value', () => {
    const arr = [];

    expect(arr.reduce2((acc, val) => acc + val)).toBe(undefined);
  });

  describe('edge cases', () => {
    it.skip('should skip holes in sparse arrays', () => {
      const arr = [1, 3];

      arr.splice(1, 0); // тепер arr = [1, <empty>, 3]

      const visited = [];

      const result = arr.reduce2((acc, val, i) => {
        visited.push([i, val]);

        return acc + (val || 0);
      }, 0);

      expect(result).toBe(4);

      expect(visited).toEqual([
        [0, 1],
        [2, 3],
      ]);
    });

    it('should work on array-like objects', () => {
      const arrayLike = {
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3,
        reduce2: reduce,
      };

      const result = arrayLike.reduce2((acc, val) => acc + val, '');

      expect(result).toBe('abc');
    });

    it('should return undefined if callback is not provided', () => {
      const arr = [1, 2, 3];

      expect(arr.reduce2()).toBe(undefined);
    });

    it('should return undefined if callback is not a function', () => {
      const arr = [1, 2];

      expect(arr.reduce2(null)).toBe(undefined);
      expect(arr.reduce2(123)).toBe(undefined);
      expect(arr.reduce2('not a function')).toBe(undefined);
    });

    it('should handle callback throwing error (user-defined)', () => {
      const arr = [1, 2, 3];
      const faultyCallback = () => {
        throw new Error('Test error');
      };

      expect(() => arr.reduce2(faultyCallback)).toThrow('Test error');
    });
  });
});
// Add tests here
