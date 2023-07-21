import isSuccessCount from './index.ts';

describe('isSuccessCount', () => {
  test('should be a function', () => {
    expect(typeof isSuccessCount).toBe('function');
  });

  test('should return false', () => {
    const values = [undefined, null, '+10', '-10', 'x10', '-L', 10, -10];
    values.forEach((v) => {
      const actual = isSuccessCount(v);
      expect(actual).toBe(false);
    });
  });

  test('should return true', () => {
    const values = ['>10', '<10', '>1', '<1'];
    values.forEach((v) => {
      const actual = isSuccessCount(v);
      expect(actual).toBe(true);
    });
  });
});
