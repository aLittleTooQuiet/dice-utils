import parseDieNotation from '../parse-die-notation/index';
import rollDie from '../roll-die/index';

const getTotal = (results, { mod, multiply, dropLow }) => {
  let resultCopy = [...results];
  let total = 0;

  if (dropLow) {
    (resultCopy = resultCopy.sort((a, b) => a - b)).shift();
  }

  resultCopy.forEach((v) => {
    total += v;
  });

  if (multiply) {
    total *= mod;
  } else if (mod) {
    total += mod;
  }

  return total;
};

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
    count, sides, mod, multiply, dropLow,
  } = parseDieNotation(diceString);
  const results = [];

  for (let i = 0; i < count; i += 1) {
    const currentResult = rollDie(sides, randFn);
    results.push(currentResult);
  }

  return {
    results,
    total: getTotal(results, { mod, multiply, dropLow }),
  };
};
