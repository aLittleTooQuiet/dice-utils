import isFudge from '../isFudge/index';

/**
 * Generate a random number between 1 and sides.
 * @param {int} sides - The number of sides on the die.
 * @param {function} randFn - A function that returns a pseudorandom float between 0 and 1.
 * @return {int} The number rolled.
 */
export default (sides, randFn = Math.random) => {
  if (!isFudge(sides) && !Number.isInteger(sides)) {
    throw new Error('rollDie must be called with an integer or F');
  }

  if (isFudge(sides)) {
    return Math.ceil(randFn() * 2) - 1;
  }

  return Math.ceil(randFn() * sides);
};
