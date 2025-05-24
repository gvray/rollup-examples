import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: !production
  },
  plugins: [
    nodeResolve(),
    
    // CSS处理插件
    postcss({
      // 提取CSS到单独的文件
      extract: 'bundle.css',
      
      // 使用CSS模块化
      modules: {
        // 生成的类名格式
        generateScopedName: production
          ? '[hash:base64:8]'
          : '[name]__[local]___[hash:base64:5]'
      },
      
      // 启用Sass处理
      use: ['sass'],
      
      // PostCSS插件
      plugins: [
        // 自动添加浏览器前缀
        autoprefixer(),
        
        // 生产环境下压缩CSS
        production && cssnano({
          preset: ['default', {
            discardComments: {
              removeAll: true,
            },
          }]
        })
      ].filter(Boolean),
      
      // 开发环境下启用sourceMap
      sourceMap: !production,
      
      // 压缩
      minimize: production,
      
      // 注入CSS到JS中而不是提取到单独文件（这里设为false表示提取）
      inject: false
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