import isMultiplier from '../isMultiplier';

export default (diceString) => {
  if (typeof diceString !== 'string') {
    throw new Error('parseDieNotation must be called with a dice notation string');
  }

  const parts = diceString.toLowerCase().split('d');
  const count = parseInt(parts[0], 10);
  const sides = parseInt(parts[1], 10);
  let mod = 0;
  const result = {
    count,
    sides,
  };

  if (Number.isNaN(Number(parts[1]))) {
    // die notation includes a modifier
    const modifierMatch = /[+-xX*]{1}[\d]{1,}/;
    const matchResult = parts[1].match(modifierMatch);
    if (isMultiplier(matchResult[0])) {
      result.multiply = true;
      mod = parseInt(matchResult[0].substring(1), 10);
    } else {
      mod = parseInt(matchResult[0], 10);
    }
  }
  result.mod = mod;

  return result;
};
