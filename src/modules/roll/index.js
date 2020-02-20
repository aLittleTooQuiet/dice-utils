import parseDieNotation from '../parse-die-notation/index';
import rollDie from '../roll-die/index';

/**
 * Parse a die notation string, roll the individual dice, and return the total
 * accounting for any modifiers.
 * @param {int} diceString - A die notation string ie "1d20+5".
 * @param {function} randFn - A function that returns a pseudorandom float between 0 and 1.
 * @return {object} An object containing the results of the invididual die rolls and the
 * total of the modified sum.
 */
export default (diceString, randFn = Math.random) => {
  const {
    count, sides, mod, multiply,
  } = parseDieNotation(diceString);
  const results = [];
  let total = 0;

  for (let i = 0; i < count; i += 1) {
    const currentResult = rollDie(sides, randFn);
    results.push(currentResult);
    total += currentResult;
  }

  if (multiply) {
    return {
      results,
      total: total * mod,
    };
  }

  return {
    results,
    total: total + mod,
  };
};
