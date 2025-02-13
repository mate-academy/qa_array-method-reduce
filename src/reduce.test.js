'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should be declared', () => {
    expect(reduce).toBeInstanceOf(Function);
  });

  it('should work with numbers as start value', () => {
    const testArray = [1, 662, 3.4, -6];
    const cb = (total, value) => value + total;

    expect(testArray.reduce2(cb, 20)).toEqual(680.4);
  });

  it('should work with string as start value', () => {
    const testArray = [1, 662, 3.4, -6];
    const cb = (total, value) => total + value;

    expect(testArray.reduce2(cb, '20')).toEqual('2016623.4-6');
  });

  it('should work with arrays as start value', () => {
    const testArray = [3, 'Yey', true];

    expect(testArray.reduce2((total, value) => {
      total.push(value + 1);

      return total;
    }, [])).toEqual([4, 'Yey1', 2]);
  });

  it('should work with objects as start value', () => {
    const testArray = ['dog', 'pig', 'pigeon'];
    const cb = (total, value) => {
      total[value] = 'present';

      return total;
    };
    const expectedResult = {
      'dog': 'present',
      'pig': 'present',
      'pigeon': 'present',
    };

    expect(testArray.reduce2(cb, {})).toEqual(expectedResult);
  });

  it('should use first value if start value skiped', () => {
    const initialArr = [2, 4, 8];

    expect(initialArr.reduce2((total, value) => total + value + 1)).toEqual(16);
  });

  it('should throw error withour cb', () => {
    expect(() => {
      [3, 4].reduce2();
    }).toThrow();
  });

  it('should call cb ones for one element', () => {
    const cb = jest.fn((total, value) => total + value);

    [3].reduce2(cb());
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should call cb 10 times for 10 elements and start value', () => {
    const initArray = [2, 4, 5, 6, 7, 8, 4, 6, 4, 4];
    const cb = jest.fn((total, value) => total * value);

    initArray.reduce2(cb, 1);

    expect(cb).toHaveBeenCalledTimes(10);
  });

  it('should call cb 9 times for 10 elements without start value', () => {
    const initArray = [2, 4, 5, 6, 7, 8, 4, 6, 4, 4];
    const cb = jest.fn((total, value) => total * value);

    initArray.reduce2(cb);

    expect(cb).toHaveBeenCalledTimes(9);
  });
});
