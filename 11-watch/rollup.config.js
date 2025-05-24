import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import postcss from 'rollup-plugin-postcss';

// 检查是否为生产环境
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: !production,
    name: 'watchExample'
  },
  plugins: [
    nodeResolve(),
    postcss({
      extract: true,
      minimize: production
    }),
    // 只在生产环境下压缩代码
    production && terser(),
    // 只在开发环境下启动服务器
    !production && serve({
      open: true,
      contentBase: ['dist'],
      host: 'localhost',
      port: 10011,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }),
    // 监听插件配置
    !production && {
      name: 'watch-external',
      buildStart() {
        // 监听HTML文件变化
        this.addWatchFile('dist/index.html');
      }
    }
  ].filter(Boolean),
  watch: {
    clearScreen: false,
    include: 'src/**',
    exclude: 'node_modules/**'
  }
};