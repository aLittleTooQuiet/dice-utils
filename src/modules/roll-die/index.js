/**
 * Generate a random number between 1 and sides.
 * @param {int} sides - The number of sides on the die.
 * @param {function} randFn - A function that returns a pseudorandom float between 0 and 1.
 * @return {int} The number rolled.
 */
export default (sides, randFn = Math.random) => {
  if (!Number.isInteger(sides)) {
    throw new Error('rollDie must be called with an integer');
  }

  return Math.ceil(randFn() * sides);
};
