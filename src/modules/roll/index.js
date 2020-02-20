import parseDieNotation from '../parse-die-notation/index';
import rollDie from '../roll-die/index';

/**
 * Parse a die notation string, roll the individual dice, and return the total
 * accounting for any modifiers.
 * @param {int} diceString - A die notation string ie "1d20+5".
 * @param {function} randFn - A function that returns a pseudorandom float between 0 and 1.
 * @return {int} The sum of all the dice results, plus/times any specified modifier.
 */
export default (diceString, randFn = Math.random) => {
  const {
    count, sides, mod, multiply,
  } = parseDieNotation(diceString);
  let total = 0;

  for (let i = 0; i < count; i += 1) {
    total += rollDie(sides, randFn);
  }

  if (multiply) {
    return total * mod;
  }

  return total + mod;
};
