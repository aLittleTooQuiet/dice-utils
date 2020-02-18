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
  
  test('should assume 1 die if not specified', () => {
    const data = 'd6';
    const actual = parseDieNotation(data);
    const expected = {
      count: 1,
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

  test('should account for long modifiers', () => {
    const data = '12d6+125';
    const actual = parseDieNotation(data);
    const expected = {
      count: 12,
      sides: 6,
      mod: 125,
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

  test('should account for multipliers with "x"', () => {
    const data = '1d6x10';
    const actual = parseDieNotation(data);
    const expected = {
      count: 1,
      sides: 6,
      mod: 10,
      multiply: true,
    };
    expect(actual).toEqual(expected);
  });

  test('should account for multipliers with "X"', () => {
    const data = '1d6X10';
    const actual = parseDieNotation(data);
    const expected = {
      count: 1,
      sides: 6,
      mod: 10,
      multiply: true,
    };
    expect(actual).toEqual(expected);
  });

  test('should account for multipliers with "*"', () => {
    const data = '3d6*100';
    const actual = parseDieNotation(data);
    const expected = {
      count: 3,
      sides: 6,
      mod: 100,
      multiply: true,
    };
    expect(actual).toEqual(expected);
  });
});
