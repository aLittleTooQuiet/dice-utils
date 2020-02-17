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
});
