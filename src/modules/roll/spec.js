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

  test('should account for capital D', () => {
    const randFn = jest.fn(() => 1);
    const actual = roll('1D6', randFn);
    expect(actual).toBe(6);
  });

  test('should account for positive modifiers', () => {
    const randFn = jest.fn(() => 1);
    let actual = roll('3d6', randFn);
    expect(actual).toBe(18);

    actual = roll('3d6+3', randFn);
    expect(actual).toBe(21);
  });

  test('should account for negative modifiers', () => {
    const randFn = jest.fn(() => 1);
    let actual = roll('3d6', randFn);
    expect(actual).toBe(18);

    actual = roll('3d6-3', randFn);
    expect(actual).toBe(15);
  });

  test('should account for multipliers', () => {
    const randFn = jest.fn(() => 1);
    let actual = roll('3d6', randFn);
    expect(actual).toBe(18);

    actual = roll('3d6x10', randFn);
    expect(actual).toBe(180);

    actual = roll('3d6X2', randFn);
    expect(actual).toBe(36);

    actual = roll('3d6*5', randFn);
    expect(actual).toBe(90);
  });
});
