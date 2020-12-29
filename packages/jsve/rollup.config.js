import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript'

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
  commonjs({
    include: /node_modules/,
    namedExports: {
      'node_modules/lodash/index.js': ['get', 'isEmpty'],
    },
  }),
]

export default [
  {
    input: 'src/index.tsx',
    external: { lodash: 'lodash' },
    plugins,
    output: {
      file: `dist/index.js`,
      format: 'esm',
    },
  },
]
