import parseDieNotation from '../parse-die-notation';
import rollDie from '../roll-die';

export default (diceString, randFn = Math.random) => {
  const { count, sides } = parseDieNotation(diceString);
  let total = 0;
  for (let i = 0; i < count; i += 1) {
    total += rollDie(sides, randFn);
  }
  return total;
};
