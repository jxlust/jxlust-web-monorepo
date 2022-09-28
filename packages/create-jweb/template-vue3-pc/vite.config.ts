import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import WindiCSS from 'vite-plugin-windicss';
import compressPlugin from 'vite-plugin-compression';
// const ViteFilemanager = require('filemanager-plugin').ViteFilemanager;
import DefineOptions from 'unplugin-vue-define-options/vite';

const CWD = process.cwd();

// https://cn.vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  // 环境变量
  const { VITE_BASE_URL } = loadEnv(mode, CWD);
  return {
    base: VITE_BASE_URL, // 设置打包路径
    css: {
      modules: {
        localsConvention: 'camelCase', // 默认只支持驼峰，修改为同时支持横线和驼峰
      },
      preprocessorOptions: {
        scss: {
          charset: false,
        },
        less: {
          charset: false,
        },
      },
      // TODO 构建包含@charset问题 https://github.com/vitejs/vite/issues/5833
      // charset: false,
      // postcss: {
      //   plugins: [],
      // },
    },
    plugins: [
      vue(),
      vueJsx(),
      DefineOptions(),
      WindiCSS(),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      //模块自动导入配置auto-imports.d.ts
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: true,
        imports: ['vue', 'vue-router'],
      }),
      //组件按需引入插件
      Components({
        dts: true,
        resolvers: [ElementPlusResolver(), VantResolver()],
      }),
      compressPlugin({
        ext: '.gz',
        deleteOriginFile: false, // 是否删除原始文件
      }),
      // mode !== 'development' &&
      //   ViteFilemanager({
      //     // events: {
      //     //   start: {
      //     //     del: {
      //     //       items: ['./dist'],
      //     //     },
      //     //   },
      //     //   end: {
      //     //     move: {
      //     //       items: [{ source: './www', destination: './dist' }],
      //     //     },
      //     //     zip: {
      //     //       items: [{ source: './dist', destination: './dist.zip', type: 'zip' }],
      //     //     },
      //     //     del: {
      //     //       // items: ['./dist','./www'],
      //     //     },
      //     //   },
      //     // },
      //     //https://rollupjs.org/guide/en/#output-generation-hooks
      //     customHooks: [
      //       {
      //         hookName: 'closeBundle', //generateBundle
      //         commands: {
      //           move: {
      //             items: [{ source: './www', destination: './dist/' }],
      //           },
      //           zip: {
      //             items: [{ source: './dist', destination: './dist.zip', type: 'zip' }],
      //           },
      //           del: {
      //             // items: ['./dist'],
      //           },
      //         },
      //       },
      //     ],
      //     options: {
      //       // parallel: 3,
      //       log: 'all',
      //       cache: false,
      //     },
      //   }),
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        },
      ],
    },
    build: {
      cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      sourcemap: mode !== 'production', // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
      target: 'modules', // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
      outDir: 'www', //指定输出路径
      assetsDir: 'assets', // 指定生成静态资源的存放路径
      chunkSizeWarningLimit: 550, // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
      assetsInlineLimit: 4096, // 单位字节（1024等于1kb） 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
      minify: 'terser', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
      terserOptions: {
        compress: {
          drop_console: mode === 'production', // 生产环境去除console
          drop_debugger: mode === 'production', // 生产环境去除debugger
        },
      },
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          // preview: resolve(__dirname, 'preview/index.html'),
        },
        output: {
          manualChunks: {
            // jsonWorker: [`${prefix}/language/json/json.worker`],
            // cssWorker: [`${prefix}/language/css/css.worker`],
            // htmlWorker: [`${prefix}/language/html/html.worker`],
            // tsWorker: [`${prefix}/language/typescript/ts.worker`],
            // editorWorker: [`${prefix}/editor/editor.worker`],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['@vueuse/core', 'element-plus', 'vant', 'lodash-es', 'vuedraggable'],
    },
    server: {
      host: '0.0.0.0',
      port: 8080, // 设置服务启动端口号
      open: false, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域

      // 设置代理，根据项目实际情况配置
      // proxy: {
      //   '/api': {
      //     target: 'https://xx/api/admin/',
      //     changeOrigin: true,
      //     secure: false,
      //     rewrite: (path) => path.replace('/api/', '/'),
      //   },
      // },
    },
  };
};
