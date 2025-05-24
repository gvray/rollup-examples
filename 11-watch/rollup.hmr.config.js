import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';

// 检查是否为生产环境
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: !production,
    entryFileNames: '[name].[hash].js',
    chunkFileNames: '[name].[hash].js',
    assetFileNames: '[name].[hash][extname]'
  },
  plugins: [
    nodeResolve(),
    postcss({
      extract: true,
      minimize: production,
      sourceMap: !production,
      // 启用HMR支持
      modules: {
        generateScopedName: production
          ? '[hash:base64:5]'
          : '[name]__[local]--[hash:base64:5]'
      }
    }),
    // 只在生产环境下压缩代码
    production && terser(),
    // 只在开发环境下启动服务器
    !production && serve({
      open: true,
      contentBase: ['dist'],
      host: 'localhost',
      port: 10013,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }),
    // 只在开发环境下启用LiveReload
    !production && livereload({
      watch: 'dist',
      verbose: true,
      delay: 200
    }),
    // 生成HTML文件
    {
      name: 'generate-html',
      generateBundle(outputOptions, bundle) {
        const files = Object.values(bundle);
        const jsFiles = files.filter(file => file.type === 'chunk' && file.isEntry);
        const cssFiles = files.filter(file => file.fileName.endsWith('.css'));
        
        const jsScripts = jsScripts => jsScripts
          .map(file => `<script type="module" src="./${file.fileName}"></script>`)
          .join('\n    ');
        
        const cssLinks = cssFiles => cssFiles
          .map(file => `<link rel="stylesheet" href="./${file.fileName}">`)
          .join('\n    ');
        
        const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rollup 监听模式示例 (HMR)</title>
  ${cssLinks(cssFiles)}
</head>
<body>
  <div id="app"></div>
  ${jsScripts(jsFiles)}
  <script>
    // 简易HMR实现
    if (module.hot) {
      module.hot.accept();
    }
  </script>
</body>
</html>`;
        
        this.emitFile({
          type: 'asset',
          fileName: 'index.html',
          source: html
        });
      }
    },
    // 监听插件配置
    !production && {
      name: 'hmr',
      renderChunk(code, chunk) {
        // 简单的HMR支持
        if (!production && chunk.isEntry) {
          return {
            code: `
// HMR支持
if (import.meta.hot) {
  import.meta.hot.accept();
}

${code}`,
            map: null
          };
        }
        return null;
      }
    }
  ].filter(Boolean),
  watch: {
    clearScreen: false,
    include: 'src/**',
    exclude: 'node_modules/**'
  }
};