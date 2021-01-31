import rollDie from './index';

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

  test('should return an integer between 1 and `sides`', () => {
    const sides = 6;
    // this function retuns random values, so test a few of them
    for (let i = 0; i < 10; i += 1) {
      const actual = rollDie(sides);
      expect(Number.isInteger(actual)).toBe(true);
      expect(actual).toBeGreaterThanOrEqual(1);
      expect(actual).toBeLessThanOrEqual(sides);
    }
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
    let randFn = jest.fn(() => 1);
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
