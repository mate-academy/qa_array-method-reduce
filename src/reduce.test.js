'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should reduce an array of numbers to a single value using addition', () => {
    const array = [1, 2, 3, 4, 5];
    const sum = array.reduce2((accumulator, currentValue) => accumulator + currentValue, 0);

    expect(sum).toBe(15);
  });
  
  it('should reduce an array of strings to a single concatenated string', () => {
    const array = ['Hello', ' ', 'World', '!'];
    const concatenated = array.reduce2((accumulator, currentValue) => accumulator + currentValue, '');

    expect(concatenated).toBe('Hello World!');
  });
  
  it('should reduce an array of objects to a single object by merging properties', () => {
    const array = [{ key: 'a', value: 1 }, { key: 'b', value: 2 }, { key: 'c', value: 3 }];
    const merged = array.reduce2((accumulator, currentValue) => ({ ...accumulator, [currentValue.key]: currentValue.value }), {});

    expect(merged).toEqual({ a: 1, b: 2, c: 3 });
  });
  
  it('should return the initial value if the array is empty', () => {
    const emptyArray = [];
    const initialValue = 'initial';
    const result = emptyArray.reduce2((accumulator, currentValue) => accumulator + currentValue, initialValue);

    expect(result).toBe(initialValue);
  });
  
  it('should use the first element as the initial value if not provided', () => {
    const array = [1, 2, 3, 4, 5];
    const sum = array.reduce2((accumulator, currentValue) => accumulator + currentValue);
    
    expect(sum).toBe(15);
  });
});
