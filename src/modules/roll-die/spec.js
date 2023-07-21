import rollDie from './index.ts';

const MAX = 0.9999;

describe('rollDie', () => {
  test('should be a function', () => {
    const actual = typeof rollDie;
    const expected = 'function';
    expect(actual).toBe(expected);
  });

  test('should throw if called without an integer argument', () => {
    const inputs = [undefined, '10', 10.5];
    inputs.forEach((data) => {
      expect(() => { rollDie(data); }).toThrowError('rollDie must be called with an integer');
    });
  });

  test('should call randFn once', () => {
    const randFn = jest.fn(() => Math.random());
    rollDie(6, randFn);
    expect(randFn).toHaveBeenCalledTimes(1);
  });

  test('should return a random distribution of results between 1 and sides', () => {
    const sides = 6;
    const iterations = 10000;
    const actual = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
    for (let i = 0; i < iterations; i += 1) {
      const result = rollDie(sides);
      actual[result] += 1;
    }
    const target = Math.round(iterations / sides);
    const range = 100;
    Object.keys(actual).forEach((r) => {
      expect(actual[r]).toBeGreaterThan(target - range);
      expect(actual[r]).toBeLessThan(target + range);
    });
  });

  test('should return a random distribution of results between -1 and 1, for a Fudge die', () => {
    const sides = 'F';
    const iterations = 10000;
    const actual = {
      '-1': 0,
      0: 0,
      1: 0,
    };
    for (let i = 0; i < iterations; i += 1) {
      const result = rollDie(sides);
      actual[result] += 1;
    }
    const target = Math.round(iterations / 3);
    const range = 100;
    Object.keys(actual).forEach((r) => {
      expect(actual[r]).toBeGreaterThan(target - range);
      expect(actual[r]).toBeLessThan(target + range);
    });
  });

  test('should return a minimum of 1', () => {
    let randFn = jest.fn(() => 0);
    let actual = rollDie(6, randFn);
    const expected = 1;
    expect(actual).toBe(expected);

    randFn = jest.fn(() => 0.1);
    actual = rollDie(6, randFn);
    expect(actual).toBe(expected);
  });

  test('should roll fudge dice', () => {
    let randFn = jest.fn(() => MAX);
    let actual = rollDie('F', randFn);
    let expected = 1;
    expect(actual).toBe(expected);

    randFn = jest.fn(() => 0);
    actual = rollDie('F', randFn);
    expected = -1;
    expect(actual).toBe(expected);

    randFn = jest.fn(() => 0.1);
    actual = rollDie('F', randFn);
    expected = -1;
    expect(actual).toBe(expected);

    randFn = jest.fn(() => 0.5);
    actual = rollDie('F', randFn);
    expected = 0;
    expect(actual).toBe(expected);
  });
});
