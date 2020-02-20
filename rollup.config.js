export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/dice-utils.umd.js',
      format: 'umd',
      name: 'diceUtils',
    },
    {
      file: 'dist/dice-utils.js',
      format: 'module',
    },
  ],
};
