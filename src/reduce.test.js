'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should reduce be defined', () => {
    expect(reduce).toBeDefined();
  });

  it('should add all values from numbers array', () => {
    const numbers = [1, 2, 3, 4];
    const result = numbers.reduce2(
      (accumulator, currentVal) => accumulator + currentVal
    );

    expect(result).toEqual(10);
  });

  it('should multiplay all values from numbers array', () => {
    const numbers = [1, 2, 3, 4];
    const result = numbers.reduce2(
      (accumulator, currentVal) => accumulator * currentVal
    );

    expect(result).toEqual(24);
  });

  it(`should add all values from numbers array,
    increased by initial value`, () => {
    const numbers = [1, 2, 3, 4];
    const result = numbers.reduce2(
      (accumulator, currentVal) => accumulator + currentVal,
      3
    );

    expect(result).toEqual(13);
  });

  it(`should concatenate all strings from array to one message`, () => {
    const strings = ['Hello', 'world', `it's`, 'me', 'Mario!'];
    const result = strings.reduce2(
      (accumulator, currentVal) => accumulator + ' ' + currentVal
    );

    expect(result).toEqual(`Hello world it's me Mario!`);
  });

  it('should return the initial value for an empty array', () => {
    const result = [].reduce2(() => {}, 'Mario');

    expect(result).toEqual('Mario');
  });

  it(`should return first element if there is only one in array,
    and there is no initial value provided`, () => {
    const result = [99].reduce2(() => {});

    expect(result).toEqual(99);
  });
});
