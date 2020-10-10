// Head组件的使用

import Head from 'next/head'
// import '../styles/header.css'  // 在_app.js中引入使用

const Header = () => {
  return (
    <>
      <Head>
        <title>Head的使用</title>
        <meta name='description' content='123,123123,3213' />
        <link rel='shortcut icon' href='favicon.ico' type='image/x-icon' />
      </Head>
      <div className='content'>Header</div>
    </>
  )
}

export default Header
