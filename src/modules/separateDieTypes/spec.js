import separateDieTypes from './index';

describe('separateDieTypes', () => {
  test('should be a function', () => {
    expect(typeof separateDieTypes).toBe('function');
  });

  test('should parse multiple types of dice', () => {
    const data = '12d6 * d8 + 1d100 + 1d20 + 4dF - d4 + 5';
    const actual = separateDieTypes(data);
    const expected = [
      '12d6', '*d8', '1d100', '1d20', '4df', '-d4', '5',
    ];
    expect(actual).toEqual(expected);
  });

  test('should return null if called without an argument', () => {
    const actual = separateDieTypes();
    const expected = null;
    expect(actual).toEqual(expected);
  });
});
