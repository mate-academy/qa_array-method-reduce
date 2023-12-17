'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it(`should be declared`, () => {
    expect(Array.prototype.reduce2)
      .toBeInstanceOf(Function);
  });

  it(`should reduce an array to a single value using callback`, () => {
    const array = [1, 2, 3, 4, 5];
    const callback = (acc, current) => {
      let result = 0;

      result += acc + current;

      return result;
    };
    const sum = Array.prototype.reduce2.call(array, callback);

    expect(sum).toBe(15);
  });

  it(`should return the startValue for empty array`, () => {
    const array = [];
    const sum = Array.prototype.reduce2.call(
      array, (acc, current) => acc + current, 13
    );

    expect(sum).toBe(13);
  });

  it(`should work with different types`, () => {
    const array = [1, 2, 3, 4, 5];
    const sum = Array.prototype.reduce2.call(
      array, (acc, current) => acc + current, 'Start: '
    );

    expect(sum).toBe('Start: 12345');
  });

  it(`should reduce even there are no startValue`, () => {
    const array = [1, 2, 3, 4, 6];
    const sum = Array.prototype.reduce2.call(
      array, (acc, current) => acc + current
    );

    expect(sum).toBe(16);
  });
});
