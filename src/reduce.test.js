'use strict';

describe('Reduce function', () => {
  const { reduce } = require('./reduce');
  let mockReducer;
  const testArr = [10, 20, 30];
  const initialValue = 5;

  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  beforeEach(() => {
    mockReducer = jest.fn((acc, value) => acc + value);
  });

  it('should be declared', () => {
    expect(reduce).toBeInstanceOf(Function);
  });

  describe('if initialValue is provided', () => {
    it('should execute correct sum', () => {
      const actual = testArr.reduce2(mockReducer, initialValue);
      const expected = 5 + 10 + 20 + 30;

      expect(mockReducer).toHaveBeenCalledTimes(3);
      expect(mockReducer).toHaveBeenCalledWith(5, 10, 0, [10, 20, 30]);
      expect(mockReducer).toHaveBeenCalledWith(15, 20, 1, [10, 20, 30]);
      expect(mockReducer).toHaveBeenCalledWith(35, 30, 2, [10, 20, 30]);
      expect(actual).toBe(expected);
    });

    it('should handle single-element array', () => {
      const actual = [10].reduce2(mockReducer, initialValue);
      const expected = 5 + 10;

      expect(mockReducer).toHaveBeenCalledTimes(1);
      expect(mockReducer).toHaveBeenCalledWith(5, 10, 0, [10]);
      expect(actual).toBe(expected);
    });

    it('should execute correct multiply', () => {
      mockReducer = jest.fn((acc, value) => acc * value);

      const actual = testArr.reduce2(mockReducer, initialValue);
      const expected = 5 * 10 * 20 * 30;

      expect(mockReducer).toHaveBeenCalledTimes(3);
      expect(mockReducer).toHaveBeenCalledWith(5, 10, 0, [10, 20, 30]);
      expect(mockReducer).toHaveBeenCalledWith(50, 20, 1, [10, 20, 30]);
      expect(mockReducer).toHaveBeenCalledWith(1000, 30, 2, [10, 20, 30]);
      expect(actual).toBe(expected);
    });

    it('should execute correct concatenate', () => {
      const actual = ['Mate ', 'Academy ', '!'].reduce2(mockReducer, '');
      const expected = 'Mate Academy !';

      expect(mockReducer).toHaveBeenCalledTimes(3);

      expect(mockReducer).toHaveBeenCalledWith('',
        'Mate ', 0, ['Mate ', 'Academy ', '!']);

      expect(mockReducer).toHaveBeenCalledWith('Mate ',
        'Academy ', 1, ['Mate ', 'Academy ', '!']);

      expect(mockReducer).toHaveBeenCalledWith('Mate Academy ',
        '!', 2, ['Mate ', 'Academy ', '!']);

      expect(actual).toBe(expected);
    });

    it('should handle empty array', () => {
      const actual = [].reduce2(mockReducer, initialValue);
      const expected = initialValue;

      expect(mockReducer).toHaveBeenCalledTimes(0);
      expect(actual).toBe(expected);
    });
  });

  describe('if initialValue is not provided', () => {
    it('should execute correct sum', () => {
      const actual = testArr.reduce2(mockReducer);
      const expected = 10 + 20 + 30;

      expect(mockReducer).toHaveBeenCalledTimes(2);
      expect(mockReducer).toHaveBeenCalledWith(10, 20, 1, [10, 20, 30]);
      expect(mockReducer).toHaveBeenCalledWith(30, 30, 2, [10, 20, 30]);
      expect(actual).toBe(expected);
    });

    it('should handle single-element array', () => {
      const actual = [10].reduce2(mockReducer);
      const expected = 10;

      expect(mockReducer).toHaveBeenCalledTimes(0);
      expect(actual).toBe(expected);
    });

    it('should execute correct multiply', () => {
      mockReducer = jest.fn((acc, value) => acc * value);

      const actual = testArr.reduce2(mockReducer);
      const expected = 10 * 20 * 30;

      expect(mockReducer).toHaveBeenCalledTimes(2);
      expect(mockReducer).toHaveBeenCalledWith(10, 20, 1, [10, 20, 30]);
      expect(mockReducer).toHaveBeenCalledWith(200, 30, 2, [10, 20, 30]);
      expect(actual).toBe(expected);
    });

    it('should execute correct concatenate', () => {
      const actual = ['Mate ', 'Academy ', '!'].reduce2(mockReducer);
      const expected = 'Mate Academy !';

      expect(mockReducer).toHaveBeenCalledTimes(2);

      expect(mockReducer).toHaveBeenCalledWith('Mate ',
        'Academy ', 1, ['Mate ', 'Academy ', '!']);

      expect(mockReducer).toHaveBeenCalledWith('Mate Academy ',
        '!', 2, ['Mate ', 'Academy ', '!']);

      expect(actual).toBe(expected);
    });

    it('should handle empty array and throw TypeError', () => {
      expect(() => [].reduce2(mockReducer)).toThrow(TypeError);
    });
  });
});
