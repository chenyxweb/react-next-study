import React from 'react'
import Link from 'next/link'
import Router, { useRouter, withRouter } from 'next/router'

const RouterA = props => {
  console.log('props: ', props);
  // const router = useRouter()


  // console.log('router: ', router)
  const handleClick = () => {
    console.log('click')
    Router.push('/router-b')
  }

  return (
    <div>
      <div>页面a</div>
      <Link href='/router-b'>
        <a>去页面b</a>
      </Link>
      <button onClick={handleClick}>去页面b</button>
    </div>
  )
}

export default withRouter(RouterA)
