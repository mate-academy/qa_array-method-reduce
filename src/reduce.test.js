'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  let array;

  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  beforeEach(() => {
    array = [1, 2, 3, 4];
  });

  it('should correctly sum all elements', () => {
    const result = reduce.call(array, (acc, curr) => acc + curr, 0);

    expect(result).toBe(10);
  });

  it('should correctly multiply all elements', () => {
    const result = reduce.call(array, (acc, curr) => acc * curr, 1);

    expect(result).toBe(24);
  });

  it('should handle empty array', () => {
    const result = reduce.call([], (acc, curr) => acc * curr, 10);

    expect(result).toBe(10);
  });

  it('should work without initial value', () => {
    const result = reduce.call(array, (acc, curr) => acc + curr);

    expect(result).toBe(10);
  });

  it('should handle an array of objects and sum values', () => {
    const objects = [{ x: 1 }, { x: 2 }, { x: 3 }];
    const result = reduce.call(objects, (acc, curr) => acc + curr.x, 0);

    expect(result).toBe(6);
  });

  it('should concatenate an array of strings', () => {
    const strings = ['Hello', ' ', 'World'];
    const result = reduce.call(strings, (acc, curr) => acc + curr, '');

    expect(result).toBe('Hello World');
  });
});
