'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  let cal;

  beforeEach(() => {
    cal = jest.fn().mockImplementation((a, b) => a + b);
  });

  it(`should be declared`, () => {
    expect(reduce).toBeInstanceOf(Function);
  });

  it('should call a callback once per item with startvalue', () => {
    const items = [1, 2, 3, 4, 5];

    items.reduce2(cal, 0);

    expect(cal.mock.calls.length).toBe(5);
    expect(cal).toHaveBeenCalledTimes(5);
  });

  it('should not mutate array', () => {
    const items = [1, 2, 3, 4, 5];

    items.reduce2(cal, 10);

    expect(items).toEqual(items);
  });

  it('callback called aray.length times with initial', () => {
    const items = [1, 2, 3, 4, 5];

    items.reduce2(cal, 0);

    expect(cal).toHaveBeenCalledTimes(items.length);
  });

  it('should return reduced items', () => {
    const items = [1, 2, 3, 4, 5];

    const result = items.reduce2(cal, 0);

    expect(result).toEqual(15);
  });

  it('should return reduced items without initial value', () => {
    const items = [1, 2, 3, 4, 5];

    const result = items.reduce2(cal);

    expect(result).toEqual(15);
  });

  it('should not call a callback for an empty array', () => {
    [].reduce2(cal, 0);

    expect(cal).not.toHaveBeenCalled();
  });

  it('should return initial value if array is empty', () => {
    const items = [];
    const initialValue = 100;
    const result = items.reduce2(cal, initialValue);

    expect(result).toBe(initialValue);
  });

  it('should pass an element, an index and an array to a callback', () => {
    const items = [1, 2, 3, 4, 5];

    items.reduce2(cal, 0);

    expect(cal.mock.calls[0]).toEqual([0, 1, 0, items]);
    expect(cal).toHaveBeenCalledWith(0, 1, 0, items);
    expect(cal).toHaveBeenCalledWith(1, 2, 1, items);
    expect(cal).toHaveBeenCalledWith(3, 3, 2, items);
    expect(cal).toHaveBeenCalledWith(6, 4, 3, items);
    expect(cal).toHaveBeenCalledWith(10, 5, 4, items);
  });

  // eslint-disable-next-line max-len
  it('should throw TypeError for an empty array without an initial value', () => {
    const callback = jest.fn();

    expect(() => [].reduce2(callback)).not.toThrow(TypeError);

    expect(() => {
      [3, 4].reduce2();
    }).toThrow(TypeError);
  });

  it('array with a single element and no initial value', () => {
    const items = [5];

    const result = items.reduce2(cal);

    expect(cal).not.toHaveBeenCalled();
    expect(result).toEqual(5);
  });

  it('should return reduced items', () => {
    const items = ['al', 'ka', 't', 'r', 'az'];

    const result = items.reduce2(cal, 'prison ');

    expect(result).toEqual('prison alkatraz');
  });
});
