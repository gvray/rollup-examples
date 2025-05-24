export default [
  // 第一个入口配置
  {
    input: 'src/main-a.js',
    output: {
      file: 'dist/bundle-a.js',
      format: 'iife',
      name: 'moduleA'
    }
  },
  // 第二个入口配置
  {
    input: 'src/main-b.js',
    output: {
      file: 'dist/bundle-b.js',
      format: 'iife',
      name: 'moduleB'
    }
  },
  // 第三个入口配置 - 合并模式
  {
    input: ['src/main-a.js', 'src/main-b.js'],
    output: {
      dir: 'dist/combined',
      format: 'esm',
      entryFileNames: '[name].js',
      chunkFileNames: 'shared/[name]-[hash].js'
    },
    // 将共享模块拆分为单独的chunk
    preserveModules: false
  }
];