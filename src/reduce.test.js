/* eslint-disable max-len */
'use strict';

const { reduce } = require('./reduce');

describe('custom reduce', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-extend-native
    Array.prototype.reduce2 = reduce;
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should correctly sum the numbers in an array', () => {
    const numbers = [1, 2, 3, 4, 5];
    const sum = numbers.reduce2((acc, val) => acc + val, 0);

    expect(sum).toBe(15);
  });

  it('should correctly calculate the total price from an array of objects', () => {
    const items = [
      { price: 10 },
      { price: 20 },
      { price: 30 },
    ];

    const total = items.reduce2((acc, item) => acc + item.price, 0);

    expect(total).toBe(60);
  });

  it('should correctly concatenate strings into a sentence', () => {
    const words = ['Hello', 'World', '!'];
    const sentence = words.reduce2((acc, word) => acc + ' ' + word);

    expect(sentence).toBe('Hello World !');
  });

  it('should multiply all numbers in the array when no initial value is provided', () => {
    const numbers = [1, 2, 3, 4, 5];
    const product = numbers.reduce2((acc, val) => acc * val);

    expect(product).toBe(120);
  });

  it('should find the maximum number in an array', () => {
    const numbers = [10, 20, 30, 5, 15];
    const max = numbers.reduce2((acc, val) => (val > acc ? val : acc), 0);

    expect(max).toBe(30);
  });

  it('should return the initial value when reducing an empty array', () => {
    const emptyArray = [];
    const result = emptyArray.reduce2((acc, val) => acc + val, 10);

    expect(result).toBe(10);
  });

  it('should correctly merge an array of objects into a single object', () => {
    const objs = [{ a: 1 }, { b: 2 }, { c: 3 }];
    const combined = objs.reduce2((acc, obj) => ({
      ...acc, ...obj,
    }), {});

    expect(combined).toEqual({
      a: 1, b: 2, c: 3,
    });
  });

  it('should count occurrences of each element in an array', () => {
    const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

    const count = fruits.reduce2((acc, fruit) => {
      acc[fruit] = (acc[fruit] || 0) + 1;

      return acc;
    }, {});

    expect(count).toEqual({
      apple: 3, banana: 2, orange: 1,
    });
  });

  it('should transform an array of key-value pairs into an object', () => {
    const keyValuePairs = [['key1', 'value1'], ['key2', 'value2'], ['key3', 'value3']];
    const obj = keyValuePairs.reduce2((acc, [key, value]) => ({
      ...acc, [key]: value,
    }), {});

    expect(obj).toEqual({
      key1: 'value1', key2: 'value2', key3: 'value3',
    });
  });
});
