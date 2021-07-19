import json from '@rollup/plugin-json';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript';

const plugins = [
  typescript(),
  babel({
    exclude: 'node_modules/**',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    rootMode: 'upward',
  }),
  postcss({
    modules: true,
  }),
  json(),
];

export default [
  {
    input: 'src/index.tsx',
    plugins,
    output: {
      file: `dist/index.js`,
      format: 'esm',
    },
  },
];
