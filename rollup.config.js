export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/dice-utils.umd.js',
      format: 'umd',
      name: 'diceUtils',
      exports: 'named',
    },
    {
      file: 'dist/dice-utils.js',
      format: 'esm',
      exports: 'named',
    },
  ],
};
