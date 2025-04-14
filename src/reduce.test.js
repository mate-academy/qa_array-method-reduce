'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should correctly sum the elements in an array', () => {
    const testArray = [1, 2, 3, 4, 5];
    const expectedResult = 15;

    const actualResult = testArray.reduce2((accumulator,
      currentValue) => accumulator
    + currentValue, 0);

    expect(actualResult).toEqual(expectedResult);
  });

  it('should correctly multiply the elements in an array', () => {
    const testArray = [1, 2, 3, 4, 5];
    const expectedResult = 120;

    const actualResult = testArray.reduce2((accumulator,
      currentValue) => accumulator
    * currentValue, 1);

    expect(actualResult).toEqual(expectedResult);
  });
});
