'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should right work with function max', () => {
    const expected = 100;
    const f = (a, b) => Math.max(a, b);

    expect([1, 100].reduce2(f, 50)).toEqual(expected);
  });

  it('should right work with one element in arr', () => {
    const expected = 50;
    const f = (a, b) => Math.max(a, b);

    expect([50].reduce2(f, 10)).toEqual(expected);
  });

  it('should right work without elements in arr', () => {
    const expected = 1;
    const f = (a, b) => Math.max(a, b);

    expect([].reduce2(f, 1)).toEqual(expected);
  });

  it('should right work without elements in arr for min', () => {
    const expected = 1;
    const f = (a, b) => Math.min(a, b);

    expect([].reduce2(f, 1)).toEqual(expected);
  });

  it('should right work with function min', () => {
    const expected = 1;
    const f = (a, b) => Math.min(a, b);

    expect([1, 100].reduce2(f, 50)).toEqual(expected);
  });

  it('should right work with one element in arr', () => {
    const expected = 50;
    const f = (a, b) => Math.min(a, b);

    expect([50].reduce2(f, 10)).toEqual(expected);
  });
});
