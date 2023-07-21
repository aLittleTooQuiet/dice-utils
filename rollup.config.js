import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
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
  plugins: [typescript()],
};
