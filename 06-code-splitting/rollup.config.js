import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

// 判断是否为生产环境
const production = !process.env.ROLLUP_WATCH;

export default {
  // 多入口配置
  input: {
    main: 'src/main.js',
    about: 'src/about.js'
  },
  
  // 输出配置
  output: {
    dir: 'dist',            // 输出到dist目录
    format: 'es',           // 使用ES模块格式
    sourcemap: !production, // 开发环境生成sourcemap
    entryFileNames: '[name].js',      // 入口文件命名格式
    chunkFileNames: 'chunks/[name]-[hash].js', // 代码块命名格式
    manualChunks: {
      // 将共享模块提取到单独的chunk
      'vendor': ['lodash-es'],
      'shared': ['src/utils/common.js', 'src/utils/logger.js']
    }
  },
  
  plugins: [
    // 解析第三方模块
    resolve({
      browser: true
    }),
    
    // 将CommonJS模块转换为ES模块
    commonjs(),
    
    // 开发服务器 - 仅在开发模式下启用
    !production && serve({
      open: true,        // 自动打开浏览器
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