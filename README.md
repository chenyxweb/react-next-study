# Next.js

> 一个轻量级的 React 服务端渲染框架

## 1 概念

### SPA 

```
single page application : 单页面应用程序
缺点:首屏加载慢,不利于SEO
```

### SSR 

```
Server-side rendering : 服务端渲染
```

### SEO 

```
Search Engine Optimization : 搜索引擎优化
```

### Next.js优点

```
1 搭建轻松
2 自带数据同步 SSR 服务端-->客户端
3 丰富的生态, 插件
4 灵活的配置
```

## 2 搭建项目

### 2.1 手动搭建

https://nextjs.org/docs/getting-started#manual-setup

```text
# scripts
dev - Runs next dev which starts Next.js in development mode
build - Runs next build which builds the application for production usage
start - Runs next start which starts a Next.js production server

# 页面根据其文件名与路由关联
pages/index.js --> /
pages/about.js --> /about
```

### 2.2 create-next-app脚手架搭建

- 安装

```
npx create-next-app <project name>

// 启动
yarn dev
```

