import isDropLowest from './index.ts';

describe('isDropLowest', () => {
  test('should be a function', () => {
    expect(typeof isDropLowest).toBe('function');
  });

  test('should return false', () => {
    const values = [undefined, null, '+L', 'L', 10];
    values.forEach((v) => {
      const actual = isDropLowest(v);
      expect(actual).toBe(false);
    });
  });

  test('should return true of mod is -L', () => {
    let actual = isDropLowest('-L');
    expect(actual).toBe(true);
    actual = isDropLowest('-l');
    expect(actual).toBe(true);
  });
});
