import isFudge from '../isFudge/index.ts';

/**
 * Generate a random number between 1 and sides.
 * @param {number|"F"} sides - The number of sides on the die.
 * @param {function} randFn - A function that returns a pseudorandom float between 0 and 1.
 * @return {int} The number rolled.
 */
export default function rollDie(sides: number|'F', randFn: () => number = Math.random): number {
  if (!isFudge(sides) && !Number.isInteger(sides)) {
    throw new Error('rollDie must be called with an integer or F');
  }

  if (sides === 'F') {
    return Math.floor(randFn() * 3) - 1;
  }

  return Math.floor(randFn() * sides) + 1;
}
