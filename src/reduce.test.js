'use strict';

const fc = require('fast-check');
const { reduce } = require('./reduce');

describe('reduce2', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  describe('basic behavior', () => {
    it('sums with initial value and validates callback args', () => {
      const original = [1, 2, 3];
      const calls = [];
      const result = original.reduce2(
        (acc, curr, idx, arr) => {
          calls.push([acc, curr, idx, arr]);
          return acc + curr;
        },
        0
      );

      expect(result).toBe(6);
      expect(calls.length).toBe(3);
      expect(calls[0][0]).toBe(0);
      expect(calls[0][1]).toBe(1);
      expect(calls[0][2]).toBe(0);
      expect(calls[0][3]).toBe(original);
    });

    it('sums without initial value and validates callback args', () => {
      const original = [1, 2, 3];
      const calls = [];
      const result = original.reduce2(
        (acc, curr, idx, arr) => {
          calls.push([acc, curr, idx, arr]);
          return acc + curr;
        }
      );

      expect(result).toBe(6);
      expect(calls.length).toBe(2);
      expect(calls[0][0]).toBe(1);
      expect(calls[0][1]).toBe(2);
      expect(calls[0][2]).toBe(1);
      expect(calls[0][3]).toBe(original);
    });

    it(
      'returns initial value on empty array and never calls callback',
      () => {
        const cb = jest.fn();
        const result = [].reduce2(cb, 42);
        expect(result).toBe(42);
        expect(cb).not.toHaveBeenCalled();
      }
    );

    it('throws TypeError on empty array without initialValue', () => {
      expect(() => [].reduce2((a, b) => a + b)).toThrow(TypeError);
    });

    it('throws TypeError when callback is not a function', () => {
      expect(() => [1, 2].reduce2(null)).toThrow(TypeError);
      expect(() => [1, 2].reduce2(42)).toThrow(TypeError);
      expect(() => [1, 2].reduce2({})).toThrow(TypeError);
    });

    it('concatenates strings', () => {
      const arr = ['a', 'b', 'c'];
      const result = arr.reduce2((acc, val) => acc + val, '');
      expect(result).toBe('abc');
    });

    it('reduces an array of objects into a merged object', () => {
      const arr = [{ x: 1 }, { y: 2 }, { z: 3 }];
      const result = arr.reduce2(
        (acc, val) => Object.assign(acc, val),
        {}
      );
      expect(result).toEqual({ x: 1, y: 2, z: 3 });
    });
  });

  describe('edge cases', () => {
    it(
      'single-element array without initialValue does not call callback',
      () => {
        const cb = jest.fn();
        const result = [5].reduce2(cb);
        expect(result).toBe(5);
        expect(cb).not.toHaveBeenCalled();
      }
    );

    it(
      'single-element array with initialValue calls callback once',
      () => {
        const calls = [];
        const result = [5].reduce2(
          (acc, val, idx, arr) => {
            calls.push([acc, val, idx, arr]);
            return acc + val;
          },
          10
        );
        expect(result).toBe(15);
        expect(calls.length).toBe(1);
        expect(calls[0]).toEqual([10, 5, 0, [5]]);
      }
    );

    it('handles undefined elements and validates callback array', () => {
      const arr = [1, undefined, 3];
      const calls = [];
      const result = arr.reduce2(
        (acc, val, idx, arrArg) => {
          calls.push([val, idx, arrArg]);
          return acc + (val || 0);
        },
        0
      );

      expect(result).toBe(4);
      expect(calls).toEqual([
        [1, 0, arr],
        [undefined, 1, arr],
        [3, 2, arr]
      ]);
      expect(1 in arr).toBe(true);
    });

    it('length snapshot: pushed elements are not visited', () => {
      const arr = [1, 2];
      const calls = [];
      const result = arr.reduce2(
        (acc, val, idx, arrArg) => {
          calls.push([val, idx, arrArg]);
          if (idx === 0) arr.push(99);
          return acc + val;
        },
        0
      );
      expect(result).toBe(3);
      expect(calls.length).toBe(2);
      expect(arr).toEqual([1, 2, 99]);
      calls.forEach((c) => expect(c[2]).toBe(arr));
    });

    it('ignores prototype numeric properties', () => {
      const arr = [1, 2];
      Array.prototype[2] = 100; // eslint-disable-line
      try {
        const result = arr.reduce2(
          (acc, val) => acc + val,
          0
        );
        expect(result).toBe(3);
      } finally {
        delete Array.prototype[2];
      }
    });

    it('does not mutate input array', () => {
      const arr = [1, 2, 3];
      arr.reduce2((acc, val) => acc + val, 0);
      expect(arr).toEqual([1, 2, 3]);
    });

    it('handles null and undefined as elements', () => {
      const arr = [undefined, null, 1];
      const result = arr.reduce2(
        (acc, val) => acc.concat([val]),
        []
      );
      expect(result).toEqual([undefined, null, 1]);
    });

    it('propagates errors from callback', () => {
      expect(() =>
        [1, 2].reduce2(() => {
          throw new Error('boom');
        }, 0)
      ).toThrow('boom');
    });

    it('throws TypeError when called on null/undefined', () => {
      const cb = (a, b) => a + b;
      expect(() => reduce(null, cb, 0)).toThrow(TypeError);
      expect(() => reduce(undefined, cb, 0)).toThrow(TypeError);
    });
  });

 /*describe('property-based testing', () => {
    it('matches native reduce for numbers with initialValue', () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), fc.integer(), (arr, init) => {
          const cb = (acc, val) => acc + val;
          const native = arr.reduce(cb, init);
          const custom = arr.reduce2(cb, init);
          expect(custom).toBe(native);
        })
      );
    });*/

    it('matches native reduce for numbers without initialValue', () => {
      fc.assert(
        fc.property(
          fc.array(fc.integer(), { minLength: 1 }),
          (arr) => {
            const cb = (acc, val) => acc + val;
            const native = arr.reduce(cb);
            const custom = arr.reduce2(cb);
            expect(custom).toBe(native);
          }
        )
      );
    });

    it('matches native reduce for strings', () => {
      fc.assert(
        fc.property(fc.array(fc.string()), fc.string(), (arr, init) => {
          const cb = (acc, val) => acc + val;
          const native = arr.reduce(cb, init);
          const custom = arr.reduce2(cb, init);
          expect(custom).toBe(native);
        })
      );
    });
  });
});
