import json from '@rollup/plugin-json'
import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript'

const plugins = [
  typescript(),
  babel({
    exclude: 'node_modules/**',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    rootMode: 'upward',
  }),
  json(),
]

export default [
  {
    input: 'src/index.ts',
    plugins,
    output: {
      file: `dist/index.js`,
      format: 'esm',
    },
  },
]
