import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import copy from 'rollup-plugin-copy';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: !production,
    assetFileNames: 'assets/[name]-[hash][extname]'
  },
  plugins: [
    nodeResolve(),
    
    // 处理CSS
    postcss({
      extract: 'bundle.css',
      minimize: production
    }),
    
    // 处理图片和字体等资源
    url({
      // 限制大小为10KB，小于这个大小的文件会被转为base64
      limit: 10 * 1024,
      // 输出目录
      destDir: 'dist/assets',
      // 文件名格式
      fileName: '[name]-[hash][extname]',
      // 包含的文件类型
      include: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp', '**/*.ttf', '**/*.woff', '**/*.woff2']
    }),
    
    // 处理SVG文件，可以将SVG转为React组件
    svgr({
      // SVG转为React组件
      svgo: false,
      // 同时保留SVG的导出
      ref: true
    }),
    
    // 复制静态资源到输出目录
    copy({
      targets: [
        { src: 'src/assets/static/**/*', dest: 'dist/assets/static' },
        { src: 'src/assets/favicon.ico', dest: 'dist' }
      ],
      // 只在生产环境下执行复制
      copyOnce: true
    }),
    
    // 生产环境下压缩JS
    production && terser(),
    
    // 开发环境下启动服务器
    !production && serve({
      open: true,
      contentBase: 'dist',
      host: 'localhost',
      port: 10001,
    })
  ].filter(Boolean)
};