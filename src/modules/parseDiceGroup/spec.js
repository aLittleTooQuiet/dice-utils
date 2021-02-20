import parseDiceGroup from './index';

describe('parseDiceGroup', () => {
  test('should be a function', () => {
    expect(typeof parseDiceGroup).toBe('function');
  });

  test('should return an object describing a single dice group', () => {
    const data = '12d6';
    const actual = parseDiceGroup(data);
    const expected = {
      sides: 6,
      count: 12,
      mod: 0,
    };
    expect(actual).toEqual(expected);
  });

  test('should assume 1 die if no count specified', () => {
    const data = 'd100';
    const actual = parseDiceGroup(data);
    const expected = {
      sides: 100,
      count: 1,
      mod: 0,
    };
    expect(actual).toEqual(expected);
  });

  test('should should include a negative modifier, if applicable', () => {
    const data = '-d4';
    const actual = parseDiceGroup(data);
    const expected = {
      sides: 4,
      count: 1,
      mod: 'neg',
    };
    expect(actual).toEqual(expected);
  });
});
