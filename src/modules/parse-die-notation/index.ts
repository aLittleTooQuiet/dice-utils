import isMultiplier from '../isMultiplier/index';
import isFudge from '../isFudge/index';
import isDropLowest from '../isDropLowest/index';
import isSuccessCount from '../isSuccessCount/index';

interface DieResult {
  count: number,
  sides: number|"F",
  multiply: boolean,
  dropLow: boolean,
  success: number,
  mod: number,
};

/**
 * Parse a die notation string.
 * @param {string} diceString - A die notation string ie "1d20+5".
 * @return {dieResult} An object containing the parsed components of the die string.
 */
export default function parseDieNotation(diceString: string): DieResult {
  if (typeof diceString !== 'string') {
    throw new Error('parseDieNotation must be called with a dice notation string');
  }

  const parts = diceString.toLowerCase().split('d');

  if (parts.length < 2 || parts[1].length === 0) {
    throw new Error('Cannot parse dice notation string')
  }

  const count = parseInt(parts[0], 10) || 1;
  const sides = isFudge(parts[1]) ? 'F' : parseInt(parts[1], 10);
  let mod = 0;
  const result: DieResult = {
    count,
    sides,
    multiply: false,
    dropLow: false,
    success: null,
    mod: 0,
  };

  if (Number.isNaN(Number(parts[1]))) {
    // die notation includes a modifier
    const modifierMatch = /[+\-xX*<>]{1}[\dlL]{1,}/;
    const matchResult = parts[1].match(modifierMatch);
    if (matchResult) {
      if (isMultiplier(matchResult[0])) {
        result.multiply = true;
        mod = parseInt(matchResult[0].substring(1), 10);
      } else if (isDropLowest(matchResult[0])) {
        mod = 0;
        result.dropLow = true;
      } else if (isSuccessCount(matchResult[0])) {
        const highOrLow = matchResult[0].charAt(0);
        result.success = highOrLow === '>' ? 1 : -1;
        mod = parseInt(matchResult[0].substring(1), 10);
      } else {
        mod = parseInt(matchResult[0], 10);
      }
    }
  }
  result.mod = mod;

  return result;
};
