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

  test('should return an integer', () => {
    const actual = roll('1d6');
    expect(Number.isInteger(actual)).toBe(true);
  });

  test('should call randFn x times', () => {
    const randFn = jest.fn(() => Math.random());
    roll('6d6', randFn);
    expect(randFn).toHaveBeenCalledTimes(6);
  });

  test('should return an integer', () => {
    const count = 12;
    const sides = 6;
    // this function retuns random values, so test a few of them
    for (let i = 0; i < 10; i += 1) {
      const actual = roll(`${count}d${sides}`);
      expect(Number.isInteger(actual)).toBe(true);
      expect(actual).toBeGreaterThanOrEqual(count);
      expect(actual).toBeLessThanOrEqual(count * sides);
    }
  });
});
