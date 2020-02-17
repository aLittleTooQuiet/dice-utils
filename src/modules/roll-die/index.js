export default (sides, randFn = Math.random) => {
  if (typeof sides !== 'number' || !Number.isInteger(sides)) {
    throw new Error('rollDie must be called with an integer');
  }

  return Math.ceil(randFn() * sides);
};
