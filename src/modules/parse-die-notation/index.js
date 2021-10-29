import isMultiplier from '../isMultiplier/index';
import isFudge from '../isFudge/index';
import isDropLowest from '../isDropLowest/index';
import isSuccessCount from '../isSuccessCount/index';

/**
 * Parse a die notation string.
 * @param {int} diceString - A die notation string ie "1d20+5".
 * @return {object} An object containing the parsed components of the die string.
 */
export default (diceString) => {
  if (typeof diceString !== 'string') {
    throw new Error('parseDieNotation must be called with a dice notation string');
  }

  const parts = diceString.toLowerCase().split('d');
  const count = parseInt(parts[0], 10) || 1;
  const sides = isFudge(parts[1]) ? 'F' : parseInt(parts[1], 10);
  let mod = 0;
  const result = {
    count,
    sides,
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
