import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import { defineConfig } from 'rollup';

const packageJson = require('./package.json');

export default defineConfig([
  // JavaScript/TypeScript 打包配置
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        name: 'react-ui-library'
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'ReactUILibrary',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      },
      {
        file: 'dist/index.umd.min.js',
        format: 'umd',
        name: 'ReactUILibrary',
        plugins: [terser()],
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    ],
    plugins: [
      // 自动将 peerDependencies 排除在打包之外
      peerDepsExternal(),
      
      // 解析第三方依赖
      resolve(),
      
      // 将 CommonJS 模块转换为 ES6
      commonjs(),
      
      // 处理 CSS/SCSS
      postcss({
        modules: true,
        extract: true,
        minimize: true,
        sourceMap: true
      }),
      
      // TypeScript 支持
      typescript({ 
        tsconfig: './tsconfig.json',
        exclude: ['**/__tests__/**', '**/*.test.{ts,tsx}']
      }),
      
      // Babel 转换
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript'
        ]
      })
    ],
    external: ['react', 'react-dom']
  },
  // 类型定义文件打包配置
  {
    input: 'dist/dts/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
    external: [/\.css$/]
  }
]);