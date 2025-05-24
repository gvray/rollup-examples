import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' };

// 库名称
const libraryName = 'mathUtils';

export default [
  // UMD版本 (浏览器友好的压缩版本)
  {
    input: 'src/index.js',
    output: {
      name: libraryName,
      file: pkg.browser,
      format: 'umd',
      exports: 'named',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      terser()
    ]
  },
  
  // UMD版本 (未压缩，用于调试)
  {
    input: 'src/index.js',
    output: {
      name: libraryName,
      file: 'dist/index.umd.debug.js',
      format: 'umd',
      exports: 'named',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs()
    ]
  },
  
  // ESM和CJS版本
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs', exports: 'named', sourcemap: true },
      { file: pkg.module, format: 'es', exports: 'named', sourcemap: true }
    ],
    plugins: [
      resolve(),
      commonjs()
    ]
  }
];