import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/app1/app1.js',
  output: {
    dir: 'dist/app1',
    format: 'system',
    sourcemap: !production,
    name: 'app1',
  },
  external: ['single-spa'],
  plugins: [
    resolve({
      browser: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
      preventAssignment: true
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [['@babel/preset-env', { targets: { esmodules: true } }]],
    }),
    postcss({
      extract: true,
      minimize: production,
    }),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};