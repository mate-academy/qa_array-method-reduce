'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  const mockSumCb = jest.fn((acc, curr, index, array) => acc + curr);

  beforeEach(() => {
    mockSumCb.mockClear();
  });

  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should be declared', () => {
    expect(Array.prototype.reduce2).toBeInstanceOf(Function);
  });

  it('should call callback 4 times'
    + ' when an array\'s length is 5 and there is no initial value', () => {
    const testData = [1, 2, 3, 4, 5];

    testData.reduce2(mockSumCb);

    expect(mockSumCb).toHaveBeenCalledTimes(4);
  });

  it('should call callback 5 times'
    + ' when an array\'s length is 5 and there is an initial value', () => {
    const testData = [1, 2, 3, 4, 5];

    testData.reduce2(mockSumCb, 0);

    expect(mockSumCb).toHaveBeenCalledTimes(5);
  });

  it('should start calling callback from element[0]'
    + ' when there is an initial value', () => {
    const testData = [1, 2, 3];

    testData.reduce2(mockSumCb, 0);

    expect(mockSumCb).toHaveBeenNthCalledWith(1, 0, 1, 0, [1, 2, 3]);
  });

  it('should start calling callback from element[1]'
    + ' when there is no initial value', () => {
    const testData = [1, 2, 3];

    testData.reduce2(mockSumCb);

    expect(mockSumCb).toHaveBeenNthCalledWith(1, 1, 2, 1, [1, 2, 3]);
  });

  it('should use callback for each element one by one, staring from index 0'
    + ' when there is an initial value', () => {
    const testData = [1, 2, 3];

    testData.reduce2(mockSumCb, 0);

    expect(mockSumCb).toHaveBeenNthCalledWith(1, 0, 1, 0, [1, 2, 3]);
    expect(mockSumCb).toHaveBeenNthCalledWith(2, 1, 2, 1, [1, 2, 3]);
    expect(mockSumCb).toHaveBeenLastCalledWith(3, 3, 2, [1, 2, 3]);
  });

  it('should not call callback'
    + ' when there is one element and no initial value', () => {
    const testData = [1];

    testData.reduce2(mockSumCb);

    expect(mockSumCb).not.toHaveBeenCalled();
  });

  it('should not call callback'
    + ' when there is and initial value but no elements', () => {
    const testData = [];

    testData.reduce2(mockSumCb, 0);

    expect(mockSumCb).not.toHaveBeenCalled();
  });

  it('should return 10'
    + ' when there is one element in array and no initial value', () => {
    expect([999].reduce2(mockSumCb)).toBe(999);
  });

  it('should return 8'
    + ' when there is one element in array and initial value is 3', () => {
    expect([5].reduce2(mockSumCb, 3)).toBe(8);
  });

  it('should return 10 when the array is empty', () => {
    expect([].reduce2(mockSumCb, 10)).toBe(10);
  });

  it('should throw TypeError'
    + ' when the arrayis empty and no initial value', () => {
    expect(() => [].reduce2(mockSumCb)).toThrow(TypeError);
  });

  it('should sum correctly', () => {
    const testData = [1, 100, -10, 0, -1];

    expect(testData.reduce2((acc, curr) => acc + curr)).toBe(90);
  });

  it('should correctly sum array [1, 100, -10, 0, -1]'
    + ' with initial value of -90', () => {
    const testData = [1, 100, -10, 0, -1];

    expect(testData.reduce2((acc, curr) => acc + curr, -90)).toBe(0);
  });

  it('should accept an empty object as an initial value ', () => {
    const testData = [-1, 0, 1, 2, 3];

    expect(testData.reduce2((acc, curr) => {
      acc[curr] = 1;

      return acc;
    }, {})).toEqual({
      '-1': 1,
      '0': 1,
      '1': 1,
      '2': 1,
      '3': 1,
    });
  });
});
