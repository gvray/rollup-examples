import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import url from '@rollup/plugin-url';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

// 判断是否为生产环境
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife', // 立即执行函数，适合作为<script>标签
    sourcemap: !production,
    name: 'pluginsExample'
  },
  plugins: [
    // 解析第三方模块
    resolve({
      browser: true, // 优先使用browser字段
      preferBuiltins: false // 不优先使用Node.js内置模块
    }),
    
    // 将CommonJS模块转换为ES模块
    commonjs(),
    
    // 处理JSON文件
    json(),
    
    // 环境变量替换
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
        '__VERSION__': JSON.stringify(require('./package.json').version)
      }
    }),
    
    // 处理CSS文件
    postcss({
      extract: true, // 提取CSS到单独文件
      minimize: production, // 生产环境压缩CSS
      sourceMap: !production // 开发环境生成sourceMap
    }),
    
    // 处理图片和字体等资源文件
    url({
      limit: 10 * 1024, // 小于10kb的文件转为base64
      fileName: '[dirname][name][extname]', // 输出文件名格式
      publicPath: 'dist/assets/' // 公共路径
    }),
    
    // 使用Babel转换代码
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**', // 排除node_modules
      presets: [
        ['@babel/preset-env', {
          targets: '> 0.25%, not dead',
          useBuiltIns: 'usage',
          corejs: 3
        }]
      ]
    }),
    
    // 生产环境压缩代码
    production && terser(),
    
    // 开发服务器 - 仅在开发模式下启用
    !production && serve({
      open: true, // 自动打开浏览器
      contentBase: ['.'], // 服务根目录
      host: 'localhost',
      port: 10001
    }),
    
    // 热重载 - 仅在开发模式下启用
    !production && livereload({
      watch: ['dist', 'index.html']
    })
  ]
};