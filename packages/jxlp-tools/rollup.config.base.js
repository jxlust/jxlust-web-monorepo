import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from 'rollup-plugin-json'
// import eslint from '@rollup/plugin-eslint'
import { babel } from '@rollup/plugin-babel'
// import { terser } from "rollup-plugin-terser"; //压缩代码
// import postcss from 'rollup-plugin-postcss';//打包css

import pkg from './package.json'
const formatName = 'mytools'
const extensions = ['.js', '.ts']

export default {
  input: 'src/index.ts', // 打包入口
  //   output: {
  //     // 打包出口
  //     file: pkg.browser, // 最终打包出来的文件路径和文件名，这里是在package.json的browser: 'dist/index.js'字段中配置的
  //     format: "umd", // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
  //     name: formatName,
  //   },

  external: ['lodash'], //lodash 第三方库不被整合进来
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'esm'
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: formatName
    }
  ],
  plugins: [
    json(),
    commonjs({
      include: /node_modules/
    }),
    // 打包插件
    resolve({
      extensions,
      modulesOnly: true
    }), // 查找和打包node_modules中的第三方模块
    commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    typescript(), // 解析TypeScript
    // eslint(),
    babel({
      exclude: 'node_modules/**',
      extensions
    })
    // terser(),
  ]
}
