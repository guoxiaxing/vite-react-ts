<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [React-TS 环境搭建](#react-ts-%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA)
  - [使用 vite 搭建 React-TS 项目](#%E4%BD%BF%E7%94%A8-vite-%E6%90%AD%E5%BB%BA-react-ts-%E9%A1%B9%E7%9B%AE)
  - [配置.vscode](#%E9%85%8D%E7%BD%AEvscode)
  - [import 的图片定义类型](#import-%E7%9A%84%E5%9B%BE%E7%89%87%E5%AE%9A%E4%B9%89%E7%B1%BB%E5%9E%8B)
  - [添加 eslint 校验](#%E6%B7%BB%E5%8A%A0-eslint-%E6%A0%A1%E9%AA%8C)
  - [doctoc 给 markdown 文件加目录](#doctoc-%E7%BB%99-markdown-%E6%96%87%E4%BB%B6%E5%8A%A0%E7%9B%AE%E5%BD%95)
  - [husky & lint-staged](#husky--lint-staged)
    - [hook 拦截](#hook-%E6%8B%A6%E6%88%AA)
  - [prettier 格式化代码](#prettier-%E6%A0%BC%E5%BC%8F%E5%8C%96%E4%BB%A3%E7%A0%81)
  - [commitlint 校验提交信息格式](#commitlint-%E6%A0%A1%E9%AA%8C%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF%E6%A0%BC%E5%BC%8F)
  - [查看 husky 是否生效](#%E6%9F%A5%E7%9C%8B-husky-%E6%98%AF%E5%90%A6%E7%94%9F%E6%95%88)
  - [项目搭建遇到的问题](#%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA%E9%81%87%E5%88%B0%E7%9A%84%E9%97%AE%E9%A2%98)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
      "pre-commit": "yarn run doctoc && lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "src/**/*.{ts,tsx,js,jsx,cjs,mjs}":[
      "eslint",
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
      "pre-commit": "yarn run doctoc && lint-staged",
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

## 项目搭建遇到的问题

- pre-commit 里面的 lint-staged 好像没有生效

debug 之路： 文件被 staged 了么？？

一开始还不清楚 lint-staged 的作用机制是什么，看人家配置 src/\*\*/\*.js 以为会对匹配的所有 js 文件都做一次 lint，后面看了 lint-staged 的源码才发现值针对变更的文件，也就是 git add 后的文件做 lint 效验，所以这名字可以这么翻译：lint staged files。

也就是说 lint-staged 没有生效可能是你并没有在该次修改中修改 lint-staged 规则里的文件

[问题答案来源](https://zhuanlan.zhihu.com/p/102104085)

- eslint 报错

```
error  Missing an explicit type attribute for button  react/button-has-type
```

button 元素需要指名 type 属性的值
