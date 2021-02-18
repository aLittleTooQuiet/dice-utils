import prepareDiceString from './index';

describe('prepareDiceString', () => {
  test('should be a function', () => {
    expect(typeof prepareDiceString).toBe('function');
  });

  test('should remove white space and convert to lower case', () => {
    const diceString = '  a B  c D   e F g  ';
    const actual = prepareDiceString(diceString);
    const expected = 'abcdefg';
    expect(actual).toBe(expected);
  });
});
