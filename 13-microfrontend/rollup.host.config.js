import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import html from '@rollup/plugin-html';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/host/main.js',
  output: {
    dir: 'dist/host',
    format: 'system',
    sourcemap: !production,
    entryFileNames: 'host.[hash].js',
  },
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
    html({
      title: 'Rollup微前端示例 - 主应用',
      template: ({ title }) => {
        return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" href="host.css">
  <!-- SystemJS -->
  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.12.1/dist/system.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.12.1/dist/extras/amd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.12.1/dist/extras/named-exports.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.12.1/dist/extras/named-register.min.js"></script>
  <script type="systemjs-importmap">
    {
      "imports": {
        "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.9.4/lib/system/single-spa.min.js",
        "app1": "/app1/app1.js",
        "app2": "/app2/app2.js"
      }
    }
  </script>
</head>
<body>
  <div id="root"></div>
  <script>
    System.import('/host/host.js');
  </script>
</body>
</html>
`;
      },
    }),
    !production && serve({
      contentBase: 'dist',
      port: 5000,
      historyApiFallback: true,
    }),
    !production && livereload('dist'),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};