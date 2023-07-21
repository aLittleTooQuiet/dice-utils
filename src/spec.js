import diceUtils, { parseDieNotation, roll, rollDie } from './index';

describe('diceUtils', () => {
  test('should export an object with 3 function properties', () => {
    expect(typeof diceUtils.parseDieNotation).toBe('function');
    expect(typeof diceUtils.roll).toBe('function');
    expect(typeof diceUtils.rollDie).toBe('function');
  });

  test('should export parseDieNotation', () => {
    expect(typeof parseDieNotation).toBe('function');
  });

  test('should export roll', () => {
    expect(typeof roll).toBe('function');
  });

  test('should export rollDie', () => {
    expect(typeof rollDie).toBe('function');
  });
});
