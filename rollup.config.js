import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    { file: 'lib/index.cjs', format: 'cjs' },
    { file: 'lib/index.esm.js', format: 'esm' },
  ],
  plugins: [typescript()],
  external: ['viem', 'viem/chains'],
  treeshake: true,
};
