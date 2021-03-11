# React-TS 环境搭建

react + ts + css + eslint + husky + commitlint

## 使用 vite 搭建 React-TS 项目

```
npm init @vitejs/app my-react-app --template react
yarn create @vitejs/app hello-react --template react-ts
```

可以把 react 换成下面的任意一个

![](https://img-blog.csdnimg.cn/20210121105736674.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNDk5Nzgy,size_16,color_FFFFFF,t_70)

## 配置.vscode

项目根目录下新建.vscode/settings.json

添加 tsdk，用于自动识别项目中的 ts 的版本

```
{
    "typescript.tsdk": "node_modules/typescript/lib",
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
}
```

**如果这样配置完之后，打开 tsx 文件报错的话，可以尝试，重新打开项目**

## import 的图片定义类型

src/data/xxx 新建目录，用于类型定义

import-png.d.ts

```
declare module '*.png' {
    const value: any;
    export default value;
}
```

import-svg.d.ts

```
declare module '*.svg' {
    const value: any;
    export default value;
}
```

这样配置之后在组件中直接 import logo from './logo.svg' 就不会再报错了

## 添加 eslint 校验

[eslint-config-mkd-react](https://gitlab.zhenguanyu.com/monkey-design/eslint-config-mkd-react)

## doctoc 给 markdown 文件加目录

[doctoc 使用](https://wp-lai.gitbooks.io/learn-python/content/0MOOC/doctoc.html)

cd 到 markdown 文件(例如 ex1.md)所在目录，然后命令行使用

```
$ doctoc ex1.md
```

## husky & lint-staged

**不生效的原因可能是因为目录下没有.git**

提交代码的时候自动在提交前做一些操作

eg: 格式化代码，eslint 校验

我们需要在代码提交前对代码做一下格式化并且如果代码不符合规范就不让提交,简单的做法就是在 husky 的 pre-commit 钩子去运行 lint-staged,lint-staged 主要就干了三件事

1. 第一件就是调用 eslint --fix 修复不合符 eslint 规范的代码。

2. 第二件 prettier --write 美化代码格式。

3. 最后如果都通过了就允许代码 commit。

### hook 拦截

为了阻止提交 hook 必须以非 0 退出

"pre-commit": xxxx

是在提交之前做一些操作

可以使用 && 来执行多个命令

package.json 中进行配置

```
"husky": {
    "hooks": {
      "pre-commit": "npm run doctoc && lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "src/**/*.{ts,tsx,js,jsx,cjs,mjs}":[
      "eslint --fix",
      "prettier --write",
      "git add"
    ]
  }

```

## prettier 格式化代码

新增.prettier.json 文件

```
{
  "trailingComma": "es5",
  "singleQuote": true,
  "arrowParens": "avoid"
}
```

## commitlint 校验提交信息格式

```
yarn add @commitlint/config-conventional @commitlint/cli -D
```

在 husky 的配置加入 CommitlIint 配置，v1.0.1 版本以后为 HUSKY_GIT_PARAMS，v0.14.3 为 GIT_PARAMS

```
"husky": {
    "hooks": {
      "pre-commit": "npm run doctoc && lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
```

commitlint.config.js

```
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['upd', 'feat', 'fix', 'refactor', 'docs', 'chore', 'style', 'revert'],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
};
```

## 查看 husky 是否生效

cd .git/hooks

看是否有 pre-commit/commit-msg 等没有.sample 的文件

如果没有的话就删掉 node_modules 重新运行 yarn 安装一下依赖
