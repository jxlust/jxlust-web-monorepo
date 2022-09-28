# 我的 Vue 3 + TypeScript + Vite 搭建之旅

## Why

1. 提升开发效率
2. 代码质量
3. 统一规范和风格

## 技术栈

- 编程语言：[TypeScript 4.x](https://www.typescriptlang.org/zh/) + [JavaScript](https://www.javascript.com/)
- 构建工具：[Vite 2.x](https://cn.vitejs.dev/)
- 前端框架：[Vue 3.x](https://v3.cn.vuejs.org/)
- 路由工具：[Vue Router 4.x](https://next.router.vuejs.org/zh/index.html)
- 状态管理：[pinia 2.x](https://pinia.vuejs.org/)
- PC 端 UI 框架：[Element Plus](https://element-plus.org/#/zh-CN)
- H5 端 UI 框架：[vant](https://vant-contrib.gitee.io/vant/v3/#/zh-CN/)
- CSS 预编译：[Stylus](https://stylus-lang.com/) / [Sass](https://sass.bootcss.com/documentation) / [Less](http://lesscss.cn/)
- HTTP 工具：[Axios](https://axios-http.com/)
- Git Hook 工具：[husky](https://typicode.github.io/husky/#/) + [lint-staged](https://github.com/okonet/lint-staged)
- 代码规范：[EditorConfig](http://editorconfig.org) + [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/) + [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#translation) + [stylelint](https://stylelint.io/)
- 提交规范：[Commitizen](http://commitizen.github.io/cz-cli/) + [Commitlint](https://commitlint.js.org/#/)
- 单元测试：[vue-test-utils](https://next.vue-test-utils.vuejs.org/) + [jest](https://jestjs.io/) + [vue-jest](https://github.com/vuejs/vue-jest) + [ts-jest](https://kulshekhar.github.io/ts-jest/)
- 自动部署：[GitHub Actions](https://docs.github.com/cn/actions/learn-github-actions)
- 打包工具：[rollupjs](https://rollupjs.org/guide/)
- 打包工具：[esbuild](https://github.com/evanw/esbuild)
- 包管理工具：[pnpm](https://pnpm.io/zh/) [基准测试](https://pnpm.io/zh/benchmarks)

## Vite 构建

参考官网，一路复制粘贴回车，初始化项目

## 相关插件

1. 按需加载第三方组件插件：unplugin-vue-components
2. 模块自动导入插件：unplugin-auto-import/vite，配置 auto-imports.d.ts 全局声明
3. Jsx & Tsx 使用：@vitejs/plugin-vue-jsx
4. gzip、br 压缩: vite-plugin-compression
5. 打包文件管理：filemanager-plugin
6. css 编译处理：postcss 相关插件

## 好用的开发工具库推荐

1. [vueuse](https://vueuse.org/guide/) [github](https://github.com/vueuse/vueuse)
2. [lodash-es 工具库](https://lodash.com/docs/4.17.15)

## git husky 配置

1. 安装脚本 husky.sh

```shell
npm install prepare
```

2. 配置

```shell
git config core.hooksPath .husky
chmod 700 .husky/*
# chmod +x .husky/pre-commit
```

3. 提交规范，提交例子：

```
[type](scope): [messages]
```

```shell
git commit -m "chore: updated md.json"
git commit -m  "fix(server): send xxxx"
git commit -m "feat(blog): add comment section"
```

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `build` 对构建系统或者外部依赖项进行了修改
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中

## gzip 压缩

1. vite-plugin-compression
2. 服务器配置 gzip

```shell
# http{}下配置：
gzip on;
#不压缩临界值，大于1K的才压缩，一般不用改
gzip_min_length 1k;
#buffer，就是，嗯，算了不解释了，不用改
gzip_buffers 4 16k;
#用了反向代理的话，末端通信是HTTP/1.0,默认是HTTP/1.1
#gzip_http_version 1.0;
#压缩级别，1-10，数字越大压缩的越好，时间也越长，看心情随便改吧
gzip_comp_level 2;
#进行压缩的文件类型，缺啥补啥就行了，JavaScript有两种写法，最好都写上吧，总有人抱怨js文件没有压缩，其实多写一种格式application/javascript 就行了
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
#跟Squid等缓存服务有关，on的话会在Header里增加"Vary: Accept-Encoding"
gzip_vary off;
#IE6对Gzip不怎么友好，不给它Gzip了
gzip_disable "MSIE [1-6]\.";

```

```shell
# 安装nginx ngx_http_gzip_module模块
./configure --prefix=/usr/local/nginx --with-http_gzip_static_module
#make 安装
make
#千万不要执行make install！执行make install会直接将之前安装的nginx给覆盖掉。
#make命令执行成功之后会在objs目录下生成nginx可执行文件，直接使用此nginx替换掉原本的nginx即可
```

```shell
#静态压缩：当已经有gz压缩文件时，不再对源文件进行压缩生成gz。减小服务器压力。

server {
	listen 8080;     #1.你想让你的这个项目跑在哪个端口
    server_name 120.48.9.40;     #2.当前服务器ip
    location / {
       root   /usr/web/myBlog/dist/;     #3.dist文件的位置(根据自己dist包放置的位置决定)
       try_files $uri $uri/ /index.html;     #4.重定向,内部文件的指向(照写，history和bash通用，这里配置主要是兼容history模式，进行一个404的重定向)
        gzip_static on; #静态压缩
    }
}
```

## 文件夹打包压缩

1. filemanager-plugin

```shell
npm install filemanager-plugin --save-dev
```

2. [config](https://www.npmjs.com/package/filemanager-plugin)
3. [编译 hooks 监听](https://rollupjs.org/guide/en/#output-generation-hooks)

## setup 语法糖组件 name 问题

无意看到 element-plus 源码里面使用

1. unplugin-vue-define-options
2. vite.config.ts 配置插件即可
3. defineOptions 使用;
