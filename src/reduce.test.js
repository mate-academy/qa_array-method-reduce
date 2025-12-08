'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should call callback for each array element', () => {
    const array = [1, 3, 5, 6];
    const result = array.reduce2((acc, curr) => acc + curr, 0);

    expect(result).toBe(15);
  });

  it('uses first element as initial value if startValue is omitted', () => {
    const array = [9, 2, 6, 6];

    const result = array.reduce2((acc, curr) => acc + curr);

    expect(result).toBe(23);
  });

  it('array has one element and no startValue is provided', () => {
    const array = [5];

    const result = array.reduce2((acc, curr) => acc + curr);

    expect(result).toBe(5);
  });
});
