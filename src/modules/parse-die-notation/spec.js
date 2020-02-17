import parseDieNotation from './index';

describe('parseDieNotation', () => {
  test('should be a function', () => {
    const actual = typeof parseDieNotation;
    const expected = 'function';
    expect(actual).toBe(expected);
  });

  test('should throw if called without an argument', () => {
    expect(() => { parseDieNotation(); }).toThrowError('parseDieNotation must be called with a dice notation string');
  });

  test('should throw if called with a non-string argument', () => {
    const args = [{}, 10, [], null];
    args.forEach((arg) => {
      expect(() => { parseDieNotation(arg); }).toThrowError('parseDieNotation must be called with a dice notation string');
    });
  });

  test('should return an object with die count and sides', () => {
    const data = '12d6';
    const actual = parseDieNotation(data);
    const expected = {
      count: 12,
      sides: 6,
      mod: 0,
    };
    expect(actual).toEqual(expected);
  });

  test('should not be case sensitive', () => {
    const inputs = ['12d6', '12D6'];
    inputs.forEach((data) => {
      const actual = parseDieNotation(data);
      const expected = {
        count: 12,
        sides: 6,
        mod: 0,
      };
      expect(actual).toEqual(expected);
    });
  });

  test('should account for positive modifiers', () => {
    const data = '12d6+5';
    const actual = parseDieNotation(data);
    const expected = {
      count: 12,
      sides: 6,
      mod: 5,
    };
    expect(actual).toEqual(expected);
  });

  test('should account for negative modifiers', () => {
    const data = '12d6-5';
    const actual = parseDieNotation(data);
    const expected = {
      count: 12,
      sides: 6,
      mod: -5,
    };
    expect(actual).toEqual(expected);
  });
});
