export default (diceString) => {
  if (typeof diceString !== 'string') {
    throw new Error('parseDieNotation must be called with a dice notation string');
  }

  const parts = diceString.toLowerCase().split('d');
  const count = parseInt(parts[0], 10);
  const sides = parseInt(parts[1], 10);
  let mod = 0;

  if (Number.isNaN(Number(parts[1]))) {
    // die notation includes a modifier
    const modifierMatch = /[+-]{1}[\d]{1,}/;
    const matchResult = parts[1].match(modifierMatch);
    mod = parseInt(matchResult[0], 10);
  }

  const result = {
    count,
    sides,
    mod,
  };

  return result;
};
