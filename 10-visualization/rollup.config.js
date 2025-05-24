import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';
import fs from 'fs';

// 检查是否需要生成统计信息
const generateStats = process.env.STATS === 'true';

// 可视化插件配置
const visualizerOptions = {
  filename: 'stats.html',
  title: 'Rollup Visualization',
  open: true,
  template: 'treemap', // 可选: sunburst, treemap, network
  gzipSize: true,
  brotliSize: true,
  sourcemap: true
};

// 如果需要生成JSON统计文件
if (generateStats) {
  visualizerOptions.json = true;
  visualizerOptions.filename = 'stats.json';
}

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: true,
    name: 'bundleVisualization'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    terser({
      compress: {
        passes: 2
      },
      format: {
        comments: false
      }
    }),
    // 只在需要时添加可视化插件
    generateStats && visualizer(visualizerOptions),
    // 自定义插件：生成依赖关系报告
    {
      name: 'dependency-report',
      generateBundle(outputOptions, bundle) {
        if (generateStats) {
          const modules = [];
          
          // 收集所有模块信息
          Object.values(bundle).forEach(chunk => {
            if (chunk.modules) {
              Object.entries(chunk.modules).forEach(([id, module]) => {
                modules.push({
                  id,
                  size: module.renderedLength || 0,
                  imports: module.importedIds || [],
                  isExternal: module.isExternal || false
                });
              });
            }
          });
          
          // 生成报告
          const report = {
            date: new Date().toISOString(),
            totalModules: modules.length,
            externalModules: modules.filter(m => m.isExternal).length,
            totalSize: modules.reduce((sum, m) => sum + m.size, 0),
            modules: modules.sort((a, b) => b.size - a.size).slice(0, 20) // 只保留前20个最大的模块
          };
          
          // 写入报告文件
          fs.writeFileSync('dependency-report.json', JSON.stringify(report, null, 2));
          console.log('Dependency report generated: dependency-report.json');
        }
      }
    }
  ].filter(Boolean) // 过滤掉false值
};