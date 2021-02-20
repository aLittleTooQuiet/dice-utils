import separateDieTypes from './index';

describe('separateDieTypes', () => {
  test('should be a function', () => {
    expect(typeof separateDieTypes).toBe('function');
  });

  test('should include a single modifier as part of the previous die group', () => {
    const data = '12d6 * 10 + 3d6 + 5';
    const actual = separateDieTypes(data);
    const expected = [
      '12d6*10', '3d6+5',
    ];
    expect(actual).toEqual(expected);
  });

  test('should parse multiple types of dice', () => {
    const data = '10d10>6 + 4d6-L + 12d6 + d8 * 10 + 1d6 x 10 + 1d100 + 1d20 + 4dF - d4 + 5';
    const actual = separateDieTypes(data);
    const expected = [
      '10d10>6', '4d6-l', '12d6', 'd8*10', '1d6x10', '1d100', '1d20', '4df', '-d4+5',
    ];
    expect(actual).toEqual(expected);
  });

  test('should throw if called without an argument', () => {
    expect(() => separateDieTypes()).toThrow();
  });
});
