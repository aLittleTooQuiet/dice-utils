import isMultiplier from '../isMultiplier/index';
import isFudge from '../isFudge/index';
import isDropLowest from '../isDropLowest/index';
import isSuccessCount from '../isSuccessCount/index';

export default (diceString) => {
  const parts = diceString.toLowerCase().split('d');
  let mod = 0;
  if (parts[0].startsWith('-')) {
    const arr = parts[0].split();
    arr.shift();
    parts[0] = arr.join('');
    mod = 'neg';
  }

  const count = parseInt(parts[0], 10) || 1;
  const sides = isFudge(parts[1]) ? 'F' : parseInt(parts[1], 10);
  const result = {
    count,
    sides,
  };

  if (parts[1] && Number.isNaN(Number(parts[1]))) {
    // die notation includes a modifier
    const modifierMatch = /[+-xX*<>]{1}[\dlL]{1,}/;
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
