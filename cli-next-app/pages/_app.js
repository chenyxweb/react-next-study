// 相当于根组件

import '../styles/globals.css'
import '../styles/header.css'  // 在_app.js中引入使用

import 'antd/dist/antd.css'

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
