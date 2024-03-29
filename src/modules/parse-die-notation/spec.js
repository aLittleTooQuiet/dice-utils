import parseDieNotation from './index.ts';

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

  test('should throw if called with a string that cannot be parsed as dice notation', () => {
    const args = ['', '115', 'aerarera', 'd'];
    args.forEach((arg) => {
      expect(() => { parseDieNotation(arg); }).toThrowError('Cannot parse dice notation string');
    });
  });

  test('should return an object with die count and sides', () => {
    const data = '12d6';
    const actual = parseDieNotation(data);
    const expected = {
      count: 12,
      sides: 6,
      mod: 0,
      multiply: false,
      dropLow: false,
      success: null,
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
      multiply: false,
      dropLow: false,
      success: null,
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
        multiply: false,
        dropLow: false,
        success: null,
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
      multiply: false,
      dropLow: false,
      success: null,
    };
    expect(actual).toEqual(expected);
  });

  test('should account for positive modifiers when sides > 9', () => {
    const data = '12d20+5';
    const actual = parseDieNotation(data);
    const expected = {
      count: 12,
      sides: 20,
      mod: 5,
      multiply: false,
      dropLow: false,
      success: null,
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
      multiply: false,
      dropLow: false,
      success: null,
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
      multiply: false,
      dropLow: false,
      success: null,
    };
    expect(actual).toEqual(expected);
  });

  test('should account for negative modifiers when sides > 9', () => {
    const data = '12d20-5';
    const actual = parseDieNotation(data);
    const expected = {
      count: 12,
      sides: 20,
      mod: -5,
      multiply: false,
      dropLow: false,
      success: null,
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
      dropLow: false,
      success: null,
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
      dropLow: false,
      success: null,
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
      dropLow: false,
      success: null,
    };
    expect(actual).toEqual(expected);
  });

  test('should account for Fudge dice', () => {
    const data = '4dF';
    const actual = parseDieNotation(data);
    const expected = {
      count: 4,
      sides: 'F',
      mod: 0,
      dropLow: false,
      multiply: false,
      success: null,
    };
    expect(actual).toEqual(expected);
  });

  test('should account for dropping the lowest die', () => {
    const data = '4d6-L';
    const actual = parseDieNotation(data);
    const expected = {
      count: 4,
      sides: 6,
      mod: 0,
      dropLow: true,
      multiply: false,
      success: null,
    };
    expect(actual).toEqual(expected);
  });

  test('should account for dropping the lowest die when sides > 9', () => {
    const data = '2d20-L';
    const actual = parseDieNotation(data);
    const expected = {
      count: 2,
      sides: 20,
      mod: 0,
      success: null,
      dropLow: true,
      multiply: false,
    };
    expect(actual).toEqual(expected);
  });

  test('should account for counting successes > X', () => {
    const data = '4d6>5';
    const actual = parseDieNotation(data);
    const expected = {
      count: 4,
      sides: 6,
      mod: 5,
      success: 1,
      dropLow: false,
      multiply: false,
    };
    expect(actual).toEqual(expected);
  });

  test('should account for counting successes < X', () => {
    const data = '4d6<3';
    const actual = parseDieNotation(data);
    const expected = {
      count: 4,
      sides: 6,
      mod: 3,
      success: -1,
      dropLow: false,
      multiply: false,
    };
    expect(actual).toEqual(expected);
  });
});
