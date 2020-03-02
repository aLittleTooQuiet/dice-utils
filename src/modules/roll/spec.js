import roll from './index';

describe('roll', () => {
  test('should be a function', () => {
    const actual = typeof roll;
    const expected = 'function';
    expect(actual).toBe(expected);
  });

  test('should throw if called without an argument', () => {
    expect(() => { roll(); }).toThrow();
  });

  test('should call randFn x times', () => {
    const randFn = jest.fn(() => Math.random());
    roll('6d6', randFn);
    expect(randFn).toHaveBeenCalledTimes(6);
  });

  test('should return an array of results', () => {
    const randFn = jest.fn(() => 1);
    const actual = roll('3d6', randFn);
    const expected = {
      results: [6, 6, 6],
      total: 18,
    };
    expect(actual).toEqual(expected);
  });

  test('should account for capital D', () => {
    const randFn = jest.fn(() => 1);
    const actual = roll('1D6', randFn).total;
    expect(actual).toBe(6);
  });

  test('should account for a larger number of sides', () => {
    const randFn = jest.fn(() => 1);
    const actual = roll('1d20', randFn).total;
    expect(actual).toBe(20);
  });

  test('should account for positive modifiers', () => {
    const randFn = jest.fn(() => 1);
    let actual = roll('3d6', randFn).total;
    expect(actual).toBe(18);

    actual = roll('3d6+3', randFn).total;
    expect(actual).toBe(21);
  });

  test('should account for negative modifiers', () => {
    const randFn = jest.fn(() => 1);
    let actual = roll('3d6', randFn).total;
    expect(actual).toBe(18);

    actual = roll('3d6-3', randFn).total;
    expect(actual).toBe(15);
  });

  test('should account for multipliers', () => {
    const randFn = jest.fn(() => 1);
    let actual = roll('3d6', randFn).total;
    expect(actual).toBe(18);

    actual = roll('3d6x10', randFn).total;
    expect(actual).toBe(180);

    actual = roll('3d6X2', randFn).total;
    expect(actual).toBe(36);

    actual = roll('3d6*5', randFn).total;
    expect(actual).toBe(90);
  });

  test('should account for dropping the lowest die', () => {
    let count = -1;
    const results = [0, 1, 1, 1];
    const randFn = jest.fn(() => {
      count += 1;
      return results[count];
    });
    const actual = roll('4d6-L', randFn);
    const expected = {
      results: [1, 6, 6, 6],
      total: 18,
    };
    expect(actual).toEqual(expected);
  });
});
