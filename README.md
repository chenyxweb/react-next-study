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

```

### 2.2 create-next-app脚手架搭建

- 安装

```
npx create-next-app <project name>

// 启动
yarn dev
```

## 3 页面和组件

- 页面

```
# 不需要引入react依赖
# 页面写在pages文件夹内
# 自动根据其文件名与路由关联,不需要配置路由

pages/index.js --> /
pages/about.js --> /about

# 嵌套路径使用文件夹
pages/blog/nextBlog.js --> /blog/nextBlog.js
```

- 组件

```
# 组件写在components文件夹内
```

```js
// compones/button.js

export default ({ children }) => {
  return <button>{children}</button>
}

// 使用
import Button from '../components/button'

<Button>按钮组件</Button>
```

## 4 路由

> https://www.nextjs.cn/docs/api-reference/next/router

### 4.1 声明式导航和编程式导航

- 声明式导航

```
import Link from '/next/link'

<Link href='/router-b?id=123'>
    <a>去页面b</a>
</Link>
```

- 编程式导航

```
import Router from 'next/router'

// 传递string
Router.push('/router-b?id=123')
// 传递对象
Router.push({
	pathname:'/router-b',
	query:{id:123}
})
```

- 获取路由相关参数

```
// hook的方式
import { useRouter } from 'next/router'
const router = useRouter()
const { id } = router.query

// 高阶组件的方式
import { withRouter } from 'next/router'
withRouter(组件)
this.props.router.query
```

### 4.2 动态路由

```js
// pages/post/[id].js -- 通过文件名的方式实现动态路由

import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  console.log('router: ', router)
  return <div>post---{router.query.id}</div>
}

export default Post


// 访问页面
http://localhost:3000/post/123

```

### 4.3 路由守卫

[router.beforePopState](https://www.nextjs.cn/docs/api-reference/next/router#routerbeforepopstate)

### 4.4 路由事件 (router.events)

- routeChangeStart(url)  -- 路由将要改变时触发
- routeChangeComplete(url) -- 路由改变完成时触发
- beforeHistoryChange(url) -- 浏览器history改变之前触发
- hashChangeStart(url) -- hash将要改变时触发

```js
// pages/_app.js

import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const handleRouteChangeStart = url => console.log('routeChangeStart---', url)
  const handleRouteChangeComplete = url => console.log('routeChangeComplete---', url)
  const handleBeforeHistoryChange = url => console.log('beforeHistoryChange---', url)

  useEffect(() => {
    // 注册事件
    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('beforeHistoryChange', handleBeforeHistoryChange)

    return () => {
      // 注销事件
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('beforeHistoryChange', handleBeforeHistoryChange)
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp

```

## 5 获取远程数据 getInitialProps

- 函数组件

```js
function Page({ stars }) {
  return <div>Next stars: {stars}</div>
}

Page.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page
```

- 类组件

```js
import React from 'react'

class Page extends React.Component {
  static async getInitialProps(ctx) {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const json = await res.json()
    return { stars: json.stargazers_count }
  }

  render() {
    return <div>Next stars: {this.props.stars}</div>
  }
}

export default Page
```

**这种方法获取数据是在服务端完成**，通过打开network查看元素发现，整个页面时包括数据生成的页面结构都是一次性返回的。这样的好处是有利于seo优化，百度爬虫能抓取到页面的内容

## 6 css的使用

### 6.1 添加全局样式

要将样式表添加到您的应用程序中，请在 `pages/_app.js` 文件中导入（import）CSS 文件

```js
// pages/_app.js

import '../styles/globals.css'
```

### 6.2 css模块化和使用sass

```
// yarn add sass

// 使用方式和cra项目一致
```


```js
import styles from './index.module.scss'

const Style = () => {
  return (
    <div className={styles.Style}>
      123
      <div className={styles.title}>title</div>
    </div>
  )
}

export default Style

```

```scss
.Style {
  color: red;

  .title{
    font-weight: 700;
    font-size: 40px;
  }
}

```

## 7 懒加载

###  7.1 第三方库懒加载

```js
import { useState } from 'react'

export default () => {
  const timeStamp = +new Date()

  const [time, setTime] = useState(timeStamp)

  const handleClick = async () => {
    // 当点击按钮的时候才会去加载moment
    const moment = await import('moment')
    console.log(setTime(moment.default(timeStamp).format('YYYY-MM-DD HH:mm:ss')))
  }

  return (
    <div>
      <div>将时间戳格式化</div>
      <div>{time}</div>
      <button onClick={handleClick}>格式化</button>
    </div>
  )
}

```

###  7.2 组件懒加载

```js
// components/button.js

export default ({ children, ...restProps }) => {
  return <button {...restProps}>{children}</button>
}

```

```js
import dynamic from 'next/dynamic'

// 基础用法
// const Button = dynamic(import('../components/button'))

// 高级用法
const Button = dynamic(() => import('../components/button'), {
  // 添加加载中状态
  loading: () => <div>loading...</div>,
})

export default () => {
  return (
    <div>
      dynamicComponent
      <Button onClick={() => console.log('click')}>按钮组件</Button>
    </div>
  )
}

```

## 8 head

设置head有利于实现更好的seo

给每个页面单独设置head

```js
// Head组件的使用

import Head from 'next/head'

const Header = () => {
  return (
    <>
      <Head>
        <title>Head的使用</title>
        <meta name='description' content='123,123123,3213' />
        <link rel='shortcut icon' href='favicon.ico' type='image/x-icon' />
      </Head>
      <div>Header</div>
    </>
  )
}

export default Header

```

## 9 使next支持引入使用css

> 全局的css只能在pages/_app.js 内引入, 或者使用css module 进行引入使用css

安装

```
yarn add @zeit/next-css

const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = withCss({})
```

要实现 antd 按需加载需要配置这个

[想要同时可以使用css module的配置](https://www.npmjs.com/package/@zeit/next-sass#with-css-modules)

## 10 antd按需加载

安装

```
yarn add babel-plugin-import
```

配置文件  .babelrc

```
{
  "presets":["next/babel"],  //Next.js的总配置文件，相当于继承了它本身的所有配置
  "plugins":[     //增加新的插件，这个插件就是让antd可以按需引入，包括CSS
      [
          "import",
          {
              "libraryName":"antd",
              "style":"css"
          }
      ]
  ]
}
```



## 99 乱七八糟

- next.js引入ant design同时也要开启css modules

https://www.it610.com/article/1280008189185638400.htm