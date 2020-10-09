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

### 2.3 页面和组件

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

### 2.4 路由

> https://www.nextjs.cn/docs/api-reference/next/router

#### 2.4.1 声明式导航和编程式导航

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

#### 2.4.2 动态路由

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

#### 2.4.3 路由守卫

[router.beforePopState](https://www.nextjs.cn/docs/api-reference/next/router#routerbeforepopstate)

