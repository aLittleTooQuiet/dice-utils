import { TestScheduler } from 'jest';
import separateDieTypes from './index';

describe('separateDieTypes', () => {
  test('should be a function', () => {
    expect(typeof separateDieTypes).toBe('function');
  });

  test('should throw if called without a string', () => {
    const values = [undefined, 10, false, true, [], {}];
    values.forEach((v) => {
      expect(() => separateDieTypes(v)).toThrowError('separateDieTypes must be called with a string');
    });
  });

  test('should parse multiple types of dice', () => {
    const data = '12d6 * d8 + 1d100 + 1d20 + 4dF - d4 + 5';
    const actual = separateDieTypes(data);
    const expected = [
      '12d6', '*d8', '1d100', '1d20', '4df', '-d4', '5',
    ];
    expect(actual).toEqual(expected);
  });
});
