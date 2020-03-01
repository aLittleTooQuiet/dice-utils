import isFudge from './index';

describe('isFudge', () => {
  test('should be a function', () => {
    expect(typeof isFudge).toBe('function');
  });

  test('should return false', () => {
    const values = [undefined, null, 10, 'q'];
    values.forEach((v) => {
      const actual = isFudge(v);
      expect(actual).toBe(false);
    });
  });

  test('should return true', () => {
    const values = ['f', 'F'];
    values.forEach((v) => {
      const actual = isFudge(v);
      expect(actual).toBe(true);
    });
  });
});
