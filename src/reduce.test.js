'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should sum numbers in array', () => {
    const array = [1, 9, 6, 4, 5, 3, 2];

    expect(array.reduce2((acc, val) => acc + val, 0)).toBe(30);
  });

  it(`should work without 'accumulator'`, () => {
    const array = ['aaa', 'bbb'];

    expect(array.reduce2((acc, val) => acc + val)).toBe('aaabbb');
  });

  it(`should work with string`, () => {
    const array = ['second string', 'third string'];

    expect(array.reduce2((acc, val) => `${acc}, ${val}`, 'first string')).toBe(
      'first string, second string, third string',
    );
  });

  it(`should work with 'null'`, () => {
    const array = ['123', '456'];

    expect(array.reduce2((acc, val) => `${acc}, ${val}`, null)).toBe(
      'null, 123, 456',
    );
  });

  // Add tests here
});
