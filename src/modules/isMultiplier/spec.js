import isMultiplier from './index.ts';

describe('isMultiplier', () => {
  test('should be a function', () => {
    expect(typeof isMultiplier).toBe('function');
  });

  test('should return false by default', () => {
    const vals = [undefined, null, false, true, 'bla', '+5', '-5', -5, 5, {}, []];
    vals.forEach((val) => {
      const actual = isMultiplier(val);
      expect(actual).toBe(false);
    });
  });

  test('should return true if passed a string starting with x, X, or *', () => {
    const vals = ['x10', 'X10', '*10'];
    vals.forEach((val) => {
      const actual = isMultiplier(val);
      expect(actual).toBe(true);
    });
  });
});
