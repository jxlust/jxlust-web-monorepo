# jxltools

jxlust 前端工具库

1. tsconfig.json

```
tsc --init
```

2. tsconfig.json 配置参考

3. 安装依赖

```
npm i -D rollup typescript tslib rollup-plugin-node-resolve rollup-plugin-commonjs rollup-plugin-typescript
```

4. Rollup 配置
1. Rollup 配置文件每个配置项的具体含义可以参考：<https://www.rollupjs.com/guide/big-list-of-options>
1. Rollup 可用插件列表可以参考：<https://github.com/rollup/plugins>

1. 配置代码规范

- 安装依赖

```
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm i -D prettier
npm i -D husky lint-staged
```

- 添加配置文件 .eslintrc.js
- 添加配置文件 .prettierrc
- package.json 新增配置

```
"lint": "eslint 'src/**/*.{js,ts}'",
"prettier": "prettier --write --loglevel log 'src/**/*.{js,json,tsx,css,less,scss,vue,html,md,ts}'"
 "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*./src/**/*.{js,ts,json,css,less,md}": [
      "prettier --write",
      "npm run lint"
    ]
  }
```
